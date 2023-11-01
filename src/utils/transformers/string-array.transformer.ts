import { ValueTransformer } from 'typeorm';

export const StringArrayTransformer: ValueTransformer = {
  to: (value: string[] | string) => {
    if (Array.isArray(value)) {
      return value.join(',');
    } else return value;
  },
  from: (value: string) => value.toString().split(',') as string[],
};
