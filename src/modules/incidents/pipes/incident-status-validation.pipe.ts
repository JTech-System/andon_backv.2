import { IncidentStatusArray } from '@incidents/enums/incident-status.enum';
import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class IncidentStatusValidationPipe implements PipeTransform {
  transform(value: any): any {
    if (value && !IncidentStatusArray.includes(value)) {
      throw new BadRequestException('Invalid status parameter.');
    }
    return value;
  }
}
