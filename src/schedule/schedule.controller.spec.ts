import { Test, TestingModule } from '@nestjs/testing';
import { ScheduleController } from './schedule.controller';
import { ScheduleService } from './schedule.service';
import { mockDeep } from 'jest-mock-extended';

describe('ScheduleController', () => {
  const scheduleServiceMock = mockDeep<ScheduleService>();

  let appController: ScheduleController;
  let module: TestingModule;

  beforeEach(async () => { 
    module = await Test.createTestingModule({
      controllers: [ScheduleController],
      providers: [{ provide: ScheduleService, useValue: scheduleServiceMock }],
    }).compile();
    appController = module.get<ScheduleController>(ScheduleController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    if (module) {
      await module.close();
    }
  });

  describe('listSchedules', () => {
    it('should return the schedules', async () => {
      scheduleServiceMock.listSchedules.mockResolvedValue([]);
      const result = await appController.listSchedules();
      expect(result).toEqual([]);
    });
  });
});
