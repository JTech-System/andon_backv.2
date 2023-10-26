import { Test, TestingModule } from '@nestjs/testing';
import { NotificationPushService } from './notification-push.service';

describe('NotificationPushService', () => {
  let service: NotificationPushService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NotificationPushService],
    }).compile();

    service = module.get<NotificationPushService>(NotificationPushService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
