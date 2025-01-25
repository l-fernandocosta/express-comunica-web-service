import { describe, expect, it, jest } from '@jest/globals';
import 'reflect-metadata';
import CreateUserCommand from './create-user-command';
import DefaultCreateUserUseCase from './default-create-user.usecase';

describe('DefaultCreateUserUseCase', () => {
  let mockUseCase: DefaultCreateUserUseCase;

  beforeEach(() => {
    mockUseCase = {
      execute: jest.fn() as never,
    };
  });

  it('should execute the use case with the given command and return a user', async () => {
    const command = CreateUserCommand.create(
      'John Doe',
      'Password@123!!',
      'john.doe@example.com',
    );

    const userEntity = command.toEntity();

    (mockUseCase.execute as jest.Mock).mockResolvedValueOnce(
      userEntity as never,
    );

    const result = await mockUseCase.execute(command);

    expect(mockUseCase.execute).toHaveBeenCalledWith(command);
    expect(result).toEqual(userEntity);
  });

  it('should throw an error if use case execution fails', async () => {
    const command = CreateUserCommand.create(
      'John Doe',
      'Password@123!!',
      'john.doe@example.com',
    );

    (mockUseCase.execute as jest.Mock).mockRejectedValue(
      new Error('Execution error') as never,
    );

    await expect(mockUseCase.execute(command)).rejects.toThrow(
      'Execution error',
    );
    expect(mockUseCase.execute).toHaveBeenCalledWith(command);
  });
});
