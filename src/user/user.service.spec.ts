import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getModelToken } from '@nestjs/mongoose';
import { mockDeep } from 'jest-mock-extended';
import { Model } from 'mongoose';
import { User, UserTypeEnum } from '../schema/user.schema';
import { Client } from '../schema/client.schema';

describe('UserService', () => {
  let service: UserService;
  let mockUserModel = mockDeep<Model<User>>();
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getModelToken(Client.name),
          useValue: mockUserModel,
        },
        {
          provide: getModelToken(User.name),
          useValue: mockUserModel,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    if (module) {
      await module.close();
    }
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('listUsers', () => {
    it('should return the users', async () => {
      mockUserModel.find.mockResolvedValue([]);
      const result = await service.listUsers(UserTypeEnum.CLIENT);
      expect(result).toEqual([]);
    });
  });
});
