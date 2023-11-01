import { Test, TestingModule } from '@nestjs/testing';
import { NotificationSendService } from './notification-send.service';

describe('NotificationSendService', () => {
  let service: NotificationSendService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NotificationSendService],
    }).compile();

    service = module.get<NotificationSendService>(NotificationSendService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
