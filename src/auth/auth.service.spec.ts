import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { mockDeep } from 'jest-mock-extended';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

jest.mock('bcrypt', () => ({
  compare: jest.fn().mockResolvedValue(true),
}));

describe('AuthService', () => {
  let module: TestingModule;
  let service: AuthService;

  let jwtService;
  let userService;
  let bcrypt;

  beforeEach(async () => {
    jwtService = mockDeep<JwtService>();
    userService = mockDeep<UserService>();

    module = await Test.createTestingModule({
      providers: [AuthService, {
        provide: JwtService,
        useValue: jwtService,
      }, {
        provide: UserService,
        useValue: userService,
      }],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  afterAll(async () => {
    if (module) {
      await module.close();
    }
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('signIn', () => {
    it('should return the result of authService.signIn', async () => {
      const email = 'marcoswca1@gmail.com';
      const password = 'password';
      const response = { access_token: 'token', refresh_token: 'refresh' };
      userService.findOne.mockResolvedValue({ email, password });
      jwtService.signAsync.mockResolvedValueOnce('token');
      jwtService.signAsync.mockResolvedValueOnce('refresh');
      expect(await service.signIn(email, password)).toEqual(response);
    });
  });
});
