import { AuthGuard } from './auth.guard';
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { ExecutionContext } from '@nestjs/common';
import { createMock } from '@golevelup/ts-jest';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthGuard,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: string) => {
              switch (key) {
                case 'auth.apiKey':
                  return 'abc123';
              }

              return null;
            }),
          },
        },
      ],
    }).compile();

    authGuard = module.get<AuthGuard>(AuthGuard);
  });

  it('should be defined', () => {
    expect(authGuard).toBeDefined();
  });

  it('should return true with correct api_key', () => {
    const context = createMock<ExecutionContext>();

    context.switchToHttp().getRequest.mockReturnValue({
      headers: {
        api_key: 'abc123',
      },
    });

    expect(authGuard.canActivate(context)).toBeTruthy();
    expect(context.switchToHttp().getRequest).toHaveBeenCalled();
  });

  it('should return false with wrong api_key', () => {
    const context = createMock<ExecutionContext>();

    context.switchToHttp().getRequest.mockReturnValue({
      headers: {
        api_key: 'not_correct',
      },
    });

    expect(authGuard.canActivate(context)).toBeFalsy();
    expect(context.switchToHttp().getRequest).toHaveBeenCalled();
  });

  it('should return false without auth', () => {
    const context = createMock<ExecutionContext>();

    expect(authGuard.canActivate(context)).toBeFalsy();
    expect(context.switchToHttp().getRequest).toHaveBeenCalled();
  });
});
