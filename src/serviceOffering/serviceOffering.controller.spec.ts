import { Test, TestingModule } from '@nestjs/testing';
import { ServiceOfferingController } from './serviceOffering.controller';
import { ServiceOfferingService } from './serviceOffering.service';
import { mockDeep } from 'jest-mock-extended';

describe('ServiceOfferingController', () => {
  const serviceOfferingServiceMock = mockDeep<ServiceOfferingService>();

  let appController: ServiceOfferingController;
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      controllers: [ServiceOfferingController],
      providers: [{ provide: ServiceOfferingService, useValue: serviceOfferingServiceMock }],
    }).compile();
    appController = module.get<ServiceOfferingController>(ServiceOfferingController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    if (module) {
      await module.close();
    }
  });

  describe('listServiceOfferings', () => {
    it('should return the service offerings', async () => {
      serviceOfferingServiceMock.listServiceOfferings.mockResolvedValue([]);
      const result = await appController.listServiceOfferings();
      expect(result).toEqual([]);
    });
  });
});