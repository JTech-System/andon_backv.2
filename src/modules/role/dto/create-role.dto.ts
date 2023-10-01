import { ApiProperty } from '@nestjs/swagger';
import { MaxLength, IsString, IsArray, ArrayNotEmpty, IsInt} from 'class-validator';
export class CreateRoleDto {
  @ApiProperty({
    maxLength: 128,
  })
  @IsString()
  @MaxLength(128)
  name: string;

  @ApiProperty({
    type: Number,
    isArray: true,
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  permissions: number[]; // IDs of permissions associated with this role
}
