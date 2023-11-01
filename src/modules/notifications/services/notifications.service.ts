import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { UsersService } from '@users/users.service';
import { User } from '@users/entities/user.entity';
import { NotificationUpdateField } from '@notifications/entities/notification-update-field.entity';
import { NotificationStopField } from '@notifications/entities/notification-stop-field.entity';
import { GroupsService } from '@groups/group.service';
import { CreateNotificationDto } from '@notifications/dto/create-notification.dto';
import { Group } from '@groups/entities/group.entity';
import { Notification } from '@notifications/entities/notification.entity';
import { UpdateNotificationDto } from '@notifications/dto/update-notification.dto';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private notificationsRepository: Repository<Notification>,
    @InjectRepository(NotificationUpdateField)
    private notificationUpdateFieldsRepository: Repository<NotificationUpdateField>,
    @InjectRepository(NotificationStopField)
    private notificationStopFieldsRepository: Repository<NotificationStopField>,

    private usersService: UsersService,
    private groupsService: GroupsService,
  ) {}

  /**
   * Creates a new notification based on the provided data.
   *
   * @param {CreateNotificationDto} createNotificationDto - The data for creating the notification.
   * @returns {Promise<Notification>} A promise that resolves to the created notification.
   * @throws {NotFoundException} If the notification creation fails or the notification is not found.
   */
  async create(
    createNotificationDto: CreateNotificationDto,
  ): Promise<Notification> {
    // Initialize an empty array to store recipients.
    const recipients: User[] = [];

    // Fetch user data for each recipient ID in the input DTO.
    await Promise.all(
      createNotificationDto.recipientsId.map(async (recipient) => {
        recipients.push(await this.usersService.findOne(recipient));
      }),
    );

    // Initialize empty arrays to store groups and manager groups.
    const groups: Group[] = [];
    const managerGroups: Group[] = [];

    // Fetch group data for each group and manager group ID in the input DTO.
    await Promise.all(
      createNotificationDto.groupsId.map(async (group) => {
        groups.push(await this.groupsService.findOne(group));
      }),
    );

    await Promise.all(
      createNotificationDto.managerGroupsId.map(async (group) => {
        managerGroups.push(await this.groupsService.findOne(group));
      }),
    );

    // Create a notification using the provided data in the DTO.
    const notification = await this.notificationsRepository.save({
      recipients,
      groups,
      managerGroups,
      ...createNotificationDto,
    });

    // Save update fields associated with the notification.
    await Promise.all(
      createNotificationDto.updateFields.map(async (field) => {
        await this.notificationUpdateFieldsRepository.save({
          notification,
          ...field,
        });
      }),
    );

    // Save stop fields associated with the notification.
    await Promise.all(
      createNotificationDto.stopFields.map(async (field) => {
        await this.notificationStopFieldsRepository.save({
          notification,
          ...field,
        });
      }),
    );

    // Return the newly created notification by looking it up in the database.
    return await this.findOne(notification.id);
  }

  /**
   * Retrieves a list of notifications from the database.
   *
   * @param {string} [groupId] - An optional group ID to filter notifications by.
   * @returns {Promise<Notification[]>} A promise that resolves to an array of notifications.
   */
  async findAll(groupId?: string): Promise<Notification[]> {
    // Retrieve notifications from the database.
    // If a 'groupId' is provided, only fetch notifications associated with that group.
    return await this.notificationsRepository.find({
      // Specify the sorting order for notifications.
      order: { name: 'ASC' },
      // Include related group information in the query result.
      relations: { groups: true },
      where: {
        // Define a filter condition to fetch notifications belonging to a specific group.
        groups: {
          id: groupId,
        },
      },
    });
  }

  async findBy(
    options?: FindManyOptions<Notification>,
  ): Promise<Notification[]> {
    return await this.notificationsRepository.find(options);
  }

  /**
   * Finds a notification in the database by its unique identifier.
   *
   * @param {string} id - The unique identifier of the notification to retrieve.
   * @returns {Promise<Notification>} A promise that resolves to the retrieved notification.
   * @throws {NotFoundException} If the notification is not found in the database.
   */
  async findOne(id: string): Promise<Notification> {
    // Attempt to find a notification in the database by its unique ID.
    const notification = await this.notificationsRepository.findOne({
      where: { id },
      // Include related data when fetching the notification.
      relations: {
        recipients: true,
        groups: true,
        managerGroups: true,
        updateFields: true,
        stopFields: true,
      },
    });

    // If a notification with the provided ID is found, return it.
    if (notification) return notification;

    // If no notification is found, throw a "Not Found" exception.
    throw new NotFoundException('Notification not found');
  }

  /**
   * Updates an existing notification with the provided changes.
   *
   * @param {string} id - The unique identifier of the notification to update.
   * @param {UpdateNotificationDto} updateNotificationDto - The data for updating the notification.
   * @returns {Promise<Notification>} A promise that resolves to the updated notification.
   * @throws {NotFoundException} If the specified notification is not found in the database.
   */
  async update(
    id: string,
    updateNotificationDto: UpdateNotificationDto,
  ): Promise<Notification> {
    // Attempt to find an existing notification with the provided ID.
    await this.findOne(id);

    // Remove the existing notification with the provided ID.
    await this.remove(id);

    // Create a new notification using the data from the 'updateNotificationDto'.
    const notification = await this.create(
      updateNotificationDto as unknown as any,
    );

    // Return the newly created notification by looking it up in the database.
    return await this.findOne(notification.id);
  }

  async remove(id: string): Promise<void> {
    // Attempt to find an existing notification with the provided ID to ensure it exists.
    await this.findOne(id);

    // Delete the notification with the provided ID from the database.
    await this.notificationsRepository.delete({ id });
  }
}
