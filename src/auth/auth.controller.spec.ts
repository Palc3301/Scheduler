import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { mockDeep } from 'jest-mock-extended';

describe('AuthController', () => {
  let controller: AuthController;
  let module: TestingModule;
  let mockAuthService;

  beforeEach(async () => {
    mockAuthService = mockDeep<AuthService>();
    module = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{
        provide: AuthService,
        useValue: mockAuthService,
      }],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  afterEach(async () => {
    await module.close();
  });

  afterAll(async () => {
    if (module) {
      await module.close();
    }
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('signIn', () => {
    it('should return the result of authService.signIn', async () => {
      const email = 'marcoswca1@gmail.com';
      const password = 'password';
      const response = { access_token: 'token', refresh_token: 'refresh' };
      mockAuthService.signIn.mockResolvedValue(response);
      expect(await controller.signIn({ email, password })).toEqual(response);
      expect(mockAuthService.signIn).toHaveBeenCalledWith(email, password);
    });
  });
});
