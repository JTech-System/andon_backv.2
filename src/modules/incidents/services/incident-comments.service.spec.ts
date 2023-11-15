import { Test, TestingModule } from '@nestjs/testing';
import { IncidentCommentsService } from './incident-comments.service';

describe('IncidentCommentsService', () => {
  let service: IncidentCommentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IncidentCommentsService],
    }).compile();

    service = module.get<IncidentCommentsService>(IncidentCommentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
