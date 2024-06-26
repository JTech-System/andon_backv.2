import { ValueTransformer } from 'typeorm';

export enum NotificationOperation {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  EVENT = 'event',
}

export const NotificationOperationsArray = Object.values(NotificationOperation);

export const NotificationOperationsArrayTransformer: ValueTransformer = {
  to: (value: NotificationOperation[] | NotificationOperation) => {
    if (Array.isArray(value)) {
      return value.join(',');
    } else return value;
  },
  from: (value: string) =>
    value.toString().split(',') as NotificationOperation[],
};
