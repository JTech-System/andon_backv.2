import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class UUIDValidationPipe implements PipeTransform {
  constructor(private readonly options: { optional?: boolean } = {}) {}

  async transform(value: any): Promise<string> {
    const { optional } = this.options;

    if (!optional && !value) {
      throw new BadRequestException('UUID is required.');
    }

    if (
      value &&
      !/^[a-f\d]{8}-[a-f\d]{4}-[1-5][a-f\d]{3}-[89ab][a-f\d]{3}-[a-f\d]{12}$/i.test(
        value,
      )
    ) {
      throw new BadRequestException('Invalid UUID format.');
    }

    return value;
  }
}
