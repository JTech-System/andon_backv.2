import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class DateValidationPipe implements PipeTransform {
  constructor(private readonly options: { optional?: boolean } = {}) {}

  async transform(value: any): Promise<Date> {
    const { optional } = this.options;

    if (!optional && !value) {
      throw new BadRequestException('Date is required.');
    }

    if (value && !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(value)) {
      throw new BadRequestException('Invalid Date format.');
    }

    return value ? new Date(value) : undefined;
  }
}
