import { Injectable } from '@nestjs/common';
import { NotificationPush } from '@notifications/entities/notification-push.entity';
import { Notification } from '@notifications/entities/notification.entity';
import axios from 'axios';
import * as webPush from 'web-push';
import { NotificationPushService } from './notification-push.service';
import { NotificationOperation } from '@notifications/enums/notification-operation.enum';
import { CronJob } from 'cron';
import { DataSource, Like } from 'typeorm';
import { NotificationStopField } from '@notifications/entities/notification-stop-field.entity';
import { Group } from '@groups/entities/group.entity';
import { User } from '@users/entities/user.entity';
import { GroupsService } from '@groups/group.service';
import { NotificationsService } from './notifications.service';
import { NotificationType } from '@notifications/enums/notification-type.enum';
import { NotificationLogService } from './notification-log.service';
import { UsersService } from '@users/users.service';

webPush.setVapidDetails(
  process.env.SERVER_WORKER_SUBJECT,
  process.env.SERVER_WORKER_PUBLIC_KEY,
  process.env.SERVER_WORKER_PRIVATE_KEY,
);

@Injectable()
export class NotificationSendService {
  constructor(
    private notificationsService: NotificationsService,
    private notificationPushService: NotificationPushService,
    private notificationLogService: NotificationLogService,
    private groupsService: GroupsService,
    private usersService: UsersService,
  ) { }

  private parseContent(content: string, record: object, url: string): string {
    // Initialize the 'parsedContent' variable with the original content.
    let parsedContent = content;

    // Find all field placeholders in the 'content' string enclosed within '<< >>'.
    const fields = content.match(/<<([^>>]+)>>/g);

    // If field placeholders are found, process and replace them with actual values.
    if (fields) {
      fields.forEach((field) => {
        // Extract the field name from the placeholder by removing '<<' and '>>'.
        const fieldName = field.slice(2, -2);

        if (fieldName == 'url') {
          parsedContent = parsedContent.replace(
            field,
            `${process.env.CLIENT_URL}${url}`,
          );
        } else if (fieldName.indexOf('.') != -1) {
          const names = fieldName.split('.');
          parsedContent = parsedContent.replace(
            field,
            record[names[0]][names[1]],
          );
        }
        // Check if the 'record' object contains a value for the 'fieldName'.
        else if (record[fieldName] !== undefined) {
          // Replace the field placeholder in 'parsedContent' with the corresponding value.
          parsedContent = parsedContent.replace(field, record[fieldName]);
        }
      });
    }

    // Return the 'parsedContent' with field placeholders replaced by actual values.
    return parsedContent;
  }

  private async sendEmail(
    notification: Notification,
    emails: string[],
    record: object,
    url: string,
  ): Promise<void> {
    // Initialize a variable to store the email subject.
    let subject: string | undefined;

    // If the notification has a subject, parse and store it using the 'parseContent' method.
    if (notification.subject) {
      subject = this.parseContent(notification.subject, record, url);
    }

    // Parse the email body using the 'parseContent' method.
    const body = this.parseContent(notification.body, record, url);

    // Define the token endpoint for authentication with Microsoft Graph API.
    const tokenEndpoint = `https://login.microsoftonline.com/${process.env.TENANT_ID}/oauth2/v2.0/token`;

    // Create a request body for obtaining an access token.
    const requestBody = new URLSearchParams();
    requestBody.append('grant_type', 'client_credentials');
    requestBody.append('client_id', process.env.CLIENT_ID);
    requestBody.append('client_secret', process.env.CLIENT_SECRET);
    requestBody.append('scope', 'https://graph.microsoft.com/.default');

    try {
      // Send a request to the token endpoint to obtain an access token.
      let response = await axios.post(tokenEndpoint, requestBody, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      // Compose and send the email using the obtained access token.
      response = await axios.post(
        `https://graph.microsoft.com/v1.0/users/${process.env.EMAIL_HOST}/sendMail`,
        {
          message: {
            subject: subject,
            body: {
              contentType: 'HTML',
              content: body,
            },
            toRecipients: emails.map((email) => {
              return { emailAddress: { address: email } };
            }),
          },
        },
        {
          headers: {
            Authorization: `Bearer ${response.data.access_token}`,
            'Content-Type': 'application/json',
          },
        },
      );
    } catch (error) {
      // If an error occurs during email sending, throw an error.
      throw new Error(`Failed to send the emails: ${error.message}`);
    }
  }

  private async sendPush(
    push: NotificationPush[],
    url: string,
    body: string,
    subject?: string,
  ): Promise<void> {
    // Iterate over the 'push' array to send push notifications to multiple recipients.
    push.map(async (notificationPush) => {
      try {
        console.log("Send a push notification using webPush library and data provided");
        // Send a push notification using webPush library and data provided.
        await webPush.sendNotification(
          {
            endpoint: notificationPush.endpoint,
            keys: {
              p256dh: notificationPush.p256dh,
              auth: notificationPush.auth,
            },
          },
          JSON.stringify({
            notification: {
              title: subject,
              body: body,
              icon: '/assets/images/icon.png',
              data: {
                url: `${process.env.CLIENT_URL}${url}`,
              },
            },
          }),
        );
      } catch (ex) {
        // If an error occurs while sending the push notification, remove the corresponding push record.
        console.log("If an error occurs while sending the push notification, remove the corresponding push record");
        this.notificationPushService.remove(notificationPush.id);
      }
    });
  }

  private checkIfSend(
    operation: NotificationOperation,
    notification: Notification,
    record: object,
    lastRecord?: object,
  ): boolean {
    if (operation == NotificationOperation.UPDATE) {
      if (lastRecord) {
        // Iterate through each update field in the notification.
        for (let field of notification.updateFields) {
          // Check if the update field is related to a 'group.'
          if (field.relation) {
            switch (field.relation) {
              case 'group':
                // Check if both the current record and the last record have the 'group' field.
                if (record[field.name] && lastRecord[field.name]) {
                  // Compare the group names or the field value to determine if a notification should be sent.
                  if (
                    record[field.name].name == lastRecord[field.name].name ||
                    record[field.name].name != field.value
                  )
                    return false;
                } else if (record[field.name]) {
                  // Check if the current record's 'group' field is different from the update field value.
                  if (record[field.name].name != field.value) return false;
                } else return false;
                break;

            }
          } else {
            // Handle non-related update fields.
            if (record[field.name] && lastRecord[field.name]) {
              if (
                Array.isArray(record[field.name]) &&
                Array.isArray(lastRecord[field.name])
              ) {
                if (record[field.name].length == lastRecord[field.name].length) {
                  return false;
                }
              } else {
                // Compare the current record's field to the last record's field.
                if ((notification.recipientAgentsGroup && notification.recipientAgentsGroup != "") && record[field.name] == field.value) {
                  if (record[notification.recipientAgentsGroup] == lastRecord[notification.recipientAgentsGroup])
                    return false;
                } else if (((notification.recipientUser && notification.recipientUser != "")) && record[field.name] == field.value) {
                  if ( record[notification.recipientUser] == lastRecord[notification.recipientUser])
                    return false;
                } else {
                  if (record[field.name] == lastRecord[field.name]) return false;
                  else if (field.value && record[field.name] != field.value)
                    return false;
                }
              }
            } else if (record[field.name]) {
              // Check if the field value is provided and differs from the current record's field.
              if (field.value && record[field.name] != field.value)
                return false;
            } else {
              // If the field value is provided but the field in the current record is missing.
              if (field.value) return false;
            }
          }
        }
      } else {
        // If 'lastRecord' is not provided, throw an error as it's required for updates.
        throw Error(
          'Send notification when update is missing the last record.',
        );
      }
    }
    // Return 'true' if the conditions for sending a notification are met.
    return true;
  }

  private async stoppedCronTime(
    entity: string,
    recordId: string,
    notificationId: string,
    job: CronJob,
  ): Promise<boolean> {
    // Initialize a variable to determine if the job should be stopped.
    let stop = false;

    // Create a new data source for accessing the application's database.
    const appDataSource = new DataSource({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    });

    // Initialize the data source.
    await appDataSource.initialize();

    // Query the database to retrieve the relevant record and notification data.
    const records = (await appDataSource.query(
      `SELECT * FROM ${entity} WHERE id='${recordId}'`,
    )) as object[];

    const notifications = (await appDataSource.query(
      `SELECT * FROM notification WHERE id='${notificationId}' AND active=1`,
    )) as Notification[];

    // Check if records and notifications are found in the database.
    if (records.length > 0 && notifications.length > 0) {
      const notification = notifications[0];
      const record = records[0];

      // Check if the notification has a cronTime defined.
      if (notification.cronTime) {
        const stopFields = (await appDataSource.query(
          `SELECT * FROM notification_stop_field WHERE notificationId='${notification.id}'`,
        )) as NotificationStopField[];

        // Check if there are stop fields associated with the notification.
        if (stopFields.length == 0) {
          // Set 'stop' to false, indicating the job should be stopped.
          stop = true;
        }

        // Iterate through the stop fields to check if the job should be stopped.
        for (let field of stopFields) {
          if (field.relation) {
            switch (field.relation) {
              case 'group':
                // Check if the record has a related group ID.
                if (record[field.name + 'Id']) {
                  const groups = (await appDataSource.query(
                    `SELECT * FROM \`group\` WHERE id='${record[field.name + 'Id']
                    }'`,
                  )) as Group[];

                  // Check if the group with the specified ID exists in the database.
                  if (groups.length > 0) {
                    // Check if the group name does not match the field value, indicating the job should be stopped.
                    if (groups[0].name != field.value) stop = true;
                  } else {
                    // If the group is not found, stop the job.
                    stop = true;
                  }
                } else {
                  // If the related group ID is missing in the record, stop the job.
                  stop = true;
                }
                break;

            }
          } else {
            // Handle non-related stop fields.
            if (record[field.name]) {
              // Check if the record's field does not match the field value, indicating the job should be stopped.
              if (record[field.name] != field.value) stop = true;
            } else {
              // If the record's field is missing, stop the job.
              stop = true;
            }
          }
        }
      }
    } else stop = true;

    // If 'stop' is still true, stop the job.
    if (stop) job.stop();

    // Return the 'stop' value to indicate whether the job should be stopped.
    return stop;
  }

  private async getRecipients(
    notification: Notification,
    record: object,
  ): Promise<User[]> {
    // Initialize an array to store recipients, initially populated with the recipients from the notification.
    const recipients = notification.recipients;

    // Iterate through groups associated with the notification to add their users as recipients.
    notification.groups.map((group) => {
      group.users.map((user) => {
        // Check if the user is not already in the recipients list and add them if not.
        if (!recipients.find((recipient) => recipient.id == user.id)) {
          recipients.push(user);
        }
      });
    });

    // Iterate through manager groups to add their managers as recipients.
    notification.managerGroups.map((group) => {
      if (group.manager)
        if (!recipients.find((recipient) => recipient.id == group.manager.id)) {
          recipients.push(group.manager);
        }
    });

    // Check if the notification has a recipient group defined.
    if (notification.recipientGroup) {
      if (record[notification.recipientGroup]) {
        // Find the group associated with the record using the provided service and ID.
        (
          await this.groupsService.findOne(
            record[notification.recipientGroup]['id'],
          )
        ).users.map((user) => {
          // Check if the user is not already in the recipients list and add them if not.
          if (!recipients.find((recipient) => recipient.id == user.id))
            recipients.push(user);
        });
      }
    }

    if (notification.recipientManagerGroup) {
      if (record[notification.recipientManagerGroup]) {
        const manager = (
          await this.groupsService.findOne(
            record[notification.recipientManagerGroup]['id'],
          )
        ).manager;
        if (manager) {
          if (!recipients.find((recipient) => recipient.id == manager.id))
            recipients.push(manager);
        }
      }
    }

    if (notification.recipientAgentsGroup) {
      if (record[notification.recipientAgentsGroup]) {
        const agents = (
          await this.groupsService.findOne(
            record[notification.recipientAgentsGroup]['id'],
          )
        ).agents;
        if (agents) {
          agents.map((agent) => {
            if (!recipients.find((recipient) => recipient.id == agent.id))
              recipients.push(agent);
          });
        }
      }
    }

    if (notification.recipientUser) {
      if (record[notification.recipientUser]) {
        const user = await this.usersService.findOne(
          record[notification.recipientUser]['id'],
        );
        if (user) {
          if (!recipients.find((recipient) => recipient.id == user.id))
            recipients.push(user);
        }
      }
    }

    // Return the list of recipients, including those added from groups and manager groups.
    return await Promise.all(
      recipients.map(
        async (recipient) =>
          await this.usersService.findOneBy({
            where: {
              id: recipient.id,
            },
            relations: {
              notificationPush: true,
            },
          }),
      ),
    );
  }

  /**
   * Sends notifications based on the provided entity, operation, and record data.
   *
   * @param {string} entity - The entity for which notifications are being sent.
   * @param {NotificationOperation} operation - The type of operation that triggered the notifications.
   * @param {object} record - The data related to the operation that triggered the notifications.
   * @param {object} [lastRecord] - The data related to the previous state of the record, if applicable.
   * @returns {Promise<void>} A promise that resolves when notifications are sent.
   */
  async send(
    entity: string,
    operation: NotificationOperation,
    url: string,
    record: object,
    lastRecord?: object,
  ): Promise<void> {
    // Retrieve notifications related to the entity, operation, and email type.
    (
      await this.notificationsService.findBy({
        where: {
          entity,
          operations: Like(`%${operation}%`) as any,
          types: Like(`%${NotificationType.EMAIL}%`) as any,
          active: true,
        },
        relations: {
          recipients: true,
          groups: {
            users: true,
          },
          managerGroups: {
            manager: true,
          },
          updateFields: true,
          stopFields: true,
        },
      })
    ).map(async (notification) => {
      // Get recipient emails based on the notification and the provided record.
      const recipients = await this.getRecipients(notification, record);
      const recipientEmails = [];
      for (const user of recipients) {
        if (user.email) recipientEmails.push(user.email);
      }

      // Check if the notification should be sent based on the criteria.
      //console.log(lastRecord);
      if (this.checkIfSend(operation, notification, record, lastRecord) && recipientEmails.length > 0) {
        if (notification.cronTime) {
          // Schedule a cron job to send the email if a cronTime is defined.
          const job = new CronJob(notification.cronTime, async () => {
            if (
              !(await this.stoppedCronTime(
                entity,
                record['id'],
                notification.id,
                job,
              ))
            )
              await this.sendEmail(notification, recipientEmails, record, url);
          });
          job.start();
        } else {
          // Send the email immediately if no cronTime is defined.
          await this.sendEmail(notification, recipientEmails, record, url);
        }
      }
    });

    const notifications = await this.notificationsService.findBy({
      where: {
        entity,
        operations: Like(`%${operation}%`) as any,
        types: Like(`%${NotificationType.PUSH}%`) as any,
        active: true,
      },
      relations: {
        recipients: {
          notificationPush: true,
        },
        groups: {
          users: {
            notificationPush: true,
          },
        },
        managerGroups: {
          manager: {
            notificationPush: true,
          },
        },
        updateFields: true,
        stopFields: true,
      },
    });

    for (const notification of notifications) {
      let subject = notification.subject ? this.parseContent(notification.subject, record, url) : undefined;
      const body = this.parseContent(notification.body, record, url);
      const push = [];

      const recipients = await this.getRecipients(notification, record);

      for (const recipient of recipients) {
        for (const notificationPush of recipient.notificationPush) {
          if (!push.some(p => p.id === notificationPush.id)) {
            push.push(notificationPush);
            //console.log('Added to push:', notificationPush);
          }
        }
      }

      //console.log('Final push array before check:', push);

      if (push.length > 0 && this.checkIfSend(operation, notification, record, lastRecord)) {
        //console.log('Push array at check:', push);
        if (notification.cronTime) {
          const job = new CronJob(notification.cronTime, async () => {
            if (!(await this.stoppedCronTime(entity, record['id'], notification.id, job))) {
              await this.sendPush(push, url, body, subject);
            }
          });
          job.start();
        } else {
          await this.sendPush(push, url, body, subject);
        }
      }
    }
  }
}
