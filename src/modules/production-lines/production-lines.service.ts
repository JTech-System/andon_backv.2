import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductionLineDto } from './dto/create-production-line.dto';
import { UpdateProductionLineDto } from './dto/update-production-line.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductionLine } from './entities/production-line.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductionLinesService {
  constructor(
    @InjectRepository(ProductionLine)
    private productionLinesRepository: Repository<ProductionLine>,
  ) {}

  async create(
    createProductionLineDto: CreateProductionLineDto,
  ): Promise<ProductionLine> {
    const productionLine = await this.productionLinesRepository.save(
      createProductionLineDto,
    );
    return await this.findOne(productionLine.id);
  }

  async findAll(): Promise<ProductionLine[]> {
    return await this.productionLinesRepository.find();
  }

  async findOne(id: string): Promise<ProductionLine> {
    const productionLine = await this.productionLinesRepository.findOne({
      where: {
        id,
      },
    });
    if (productionLine) return productionLine;
    throw new NotFoundException('Production line not found');
  }

  async update(
    id: string,
    updateProductionLineDto: UpdateProductionLineDto,
  ): Promise<ProductionLine> {
    await this.findOne(id);
    await this.productionLinesRepository.update(
      { id },
      updateProductionLineDto,
    );
    return await this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    await this.productionLinesRepository.delete({ id });
  }
}
