import { Test, TestingModule } from '@nestjs/testing';
import { IncidentCategoriesService } from './incident-categories.service';

describe('IncidentCategoriesService', () => {
  let service: IncidentCategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IncidentCategoriesService],
    }).compile();

    service = module.get<IncidentCategoriesService>(IncidentCategoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
