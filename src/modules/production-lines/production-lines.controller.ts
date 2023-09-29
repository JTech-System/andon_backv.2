import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductionLinesService } from './production-lines.service';
import { CreateProductionLineDto } from './dto/create-production-line.dto';
import { UpdateProductionLineDto } from './dto/update-production-line.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ProductionLine } from './entities/production-line.entity';

@ApiTags('Production Lines')
@Controller('production-lines')
export class ProductionLinesController {
  constructor(
    private readonly productionLinesService: ProductionLinesService,
  ) {}

  @Post()
  @ApiCreatedResponse({
    type: ProductionLine,
  })
  @ApiBearerAuth()
  async create(
    @Body() createProductionLineDto: CreateProductionLineDto,
  ): Promise<ProductionLine> {
    return await this.productionLinesService.create(createProductionLineDto);
  }

  @Get()
  @ApiOkResponse({
    type: [ProductionLine],
  })
  @ApiBearerAuth()
  async findAll(): Promise<ProductionLine[]> {
    return await this.productionLinesService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({
    type: ProductionLine,
  })
  @ApiBearerAuth()
  async findOne(@Param('id') id: string): Promise<ProductionLine> {
    return await this.productionLinesService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({
    type: ProductionLine,
  })
  @ApiBearerAuth()
  async update(
    @Param('id') id: string,
    @Body() updateProductionLineDto: UpdateProductionLineDto,
  ): Promise<ProductionLine> {
    return await this.productionLinesService.update(
      id,
      updateProductionLineDto,
    );
  }

  @Delete(':id')
  @ApiOkResponse()
  @ApiBearerAuth()
  async remove(@Param('id') id: string): Promise<void> {
    await this.productionLinesService.remove(id);
  }
}
