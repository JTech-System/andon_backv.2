import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from '@utils/dto/base.dto';
import { Exclude } from 'class-transformer';
import { IsArray, IsUUID, isBoolean } from 'class-validator';
import { Group } from 'src/modules/groups/entities/group.entity';
import { Role } from 'src/modules/role/entities/role.entity';

export class ResponseUserDto extends BaseDto {
  @ApiProperty({
    maxLength: 128,
  })
  name: string;

  @ApiProperty({
    maxLength: 128,
  })
  user_id: string;

  @ApiProperty({
    maxLength: 128,
  })
  firstName: string;

  @ApiProperty({
    maxLength: 128,
  })
  lastName: string;

  @ApiProperty({
    maxLength: 128,
  })
  email: string;

  @ApiProperty({
    maxLength: 13,
  })
  phone: string;

  @ApiProperty({ type: [Role], description: 'Array of role IDs' })
  @IsArray()
  roles: Role[];

  @ApiProperty({ type: [Group], description: 'Array of groups IDs' })
  @IsArray()
  groups: Group[];

  @ApiProperty()
  isActive: boolean;
}
