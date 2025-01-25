import 'reflect-metadata';
import User from '@/domain/entities/user.entity';
import DefaultListUsersUseCase from './default-list-users.usecase';

describe('DefaultListUsersUseCase', () => {
  let mockListUsersUseCase: DefaultListUsersUseCase;

  beforeEach(() => {
    mockListUsersUseCase = {
      execute: jest.fn(),
    } as unknown as DefaultListUsersUseCase;
  });

  it('should execute the use case and return a list of users', async () => {
    const users = [
      User.create({
        name: 'John Doe',
        email: 'teste@gmail.com',
        password: '@Password@123!',
      }),
      User.create({
        name: 'Jane Doe',
        email: 'jane@gmail.com',
        password: '@Password@!@3!@#',
      }),
    ];

    (mockListUsersUseCase.execute as jest.Mock).mockResolvedValueOnce(users);

    const result = await mockListUsersUseCase.execute();

    expect(mockListUsersUseCase.execute).toHaveBeenCalled();
    expect(result).toEqual(users);
  });

  it('should throw an error if use case execution fails', async () => {
    (mockListUsersUseCase.execute as jest.Mock).mockRejectedValue(
      new Error('Execution error'),
    );

    await expect(mockListUsersUseCase.execute()).rejects.toThrow(
      'Execution error',
    );
    expect(mockListUsersUseCase.execute).toHaveBeenCalled();
  });
});
