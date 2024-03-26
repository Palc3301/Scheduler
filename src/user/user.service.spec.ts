import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getModelToken } from '@nestjs/mongoose';
import { User } from './user.schema';
import { mockDeep } from 'jest-mock-extended';
import { Model } from 'mongoose';

describe('UserService', () => {
  let service: UserService;
  let mockUserModel = mockDeep<Model<User>>();
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      providers: [
        UserService,
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
      const result = await service.listUsers();
      expect(result).toEqual([]);
    });
  });
});
