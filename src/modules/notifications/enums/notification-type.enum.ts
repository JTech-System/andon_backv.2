import { ValueTransformer } from 'typeorm';

export enum NotificationType {
  EMAIL = 'email',
  PUSH = 'push',
  // whatsapp = 'whatsapp',
}

export const NotificationTypesArray = Object.values(NotificationType);

export const NotificationTypesArrayTransformer: ValueTransformer = {
  to: (value: NotificationType[] | NotificationType) => {
    if (Array.isArray(value)) {
      return value.join(',');
    } else return value;
  },
  from: (value: string) => value.toString().split(',') as NotificationType[],
};
