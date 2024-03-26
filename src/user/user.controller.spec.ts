import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { mockDeep } from 'jest-mock-extended';

describe('UserController', () => {
  const userServiceMock = mockDeep<UserService>();

  let appController: UserController;
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      controllers: [UserController],
      providers: [{ provide: UserService, useValue: userServiceMock }],
    }).compile();

    appController = module.get<UserController>(UserController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    if (module) {
      await module.close();
    }
  });

  describe('listUsers', () => {
    it('should return the users', async () => {
      userServiceMock.listUsers.mockResolvedValue([]);
      const result = await appController.listUsers();
      expect(result).toEqual([]);
    });
  });
});
