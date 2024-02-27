import { ApiProperty } from '@nestjs/swagger';
import {
  IncidentStatus,
  IncidentStatusArray,
} from '@incidents/enums/incident-status.enum';
import {
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';
import {
  IncidentPrioritiesArray,
  IncidentPriority,
} from '@incidents/enums/incident-priority.enum';

export class UpdateIncidentDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    enum: IncidentStatusArray,
  })
  @IsString()
  @IsEnum(IncidentStatusArray)
  @IsOptional()
  status?: IncidentStatus;

  @ApiProperty()
  @IsString()
  @IsUUID()
  @IsOptional()
  categoryId?: string;

  @ApiProperty()
  @IsString()
  @IsUUID()
  @IsOptional()
  productionLineId?: string;

  @ApiProperty({
    required: false,
  })
  @IsString()
  @IsUUID()
  @IsOptional()
  assignedGroupId?: string;

  @ApiProperty({
    required: false,
  })
  @IsString()
  @IsUUID()
  @IsOptional()
  assignedToId?: string;

  @ApiProperty({
    required: false,
  })
  @IsString()
  @IsUUID()
  @IsOptional()
  machineId?: string;

  @ApiProperty({
    enum: IncidentPrioritiesArray,
    required: false,
  })
  @IsString()
  @IsEnum(IncidentPrioritiesArray)
  @IsOptional()
  priority?: IncidentPriority;

  @ApiProperty({
    required: false,
  })
  @IsInt()
  @Min(0)
  @IsOptional()
  resolutionTimeInMinutes?: number;

  @ApiProperty({
    required: false,
  })
  @IsString()
  @IsOptional()
  proposedSolution?: string;

  @ApiProperty({
    required: false,
  })
  @IsString()
  @IsOptional()
  closeNotes?: string;
}
