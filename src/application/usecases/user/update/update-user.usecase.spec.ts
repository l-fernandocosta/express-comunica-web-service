import { randomUUID } from 'crypto';
import 'reflect-metadata';
import DefaultUpdateUserUseCase from './default-update-user.usecase';
import UpdateUserCommand from './update-user-command';

describe('DefaultUpdateUserUseCase', () => {
  const id = randomUUID();
  let mockUpdateUserUseCase: DefaultUpdateUserUseCase;

  beforeEach(() => {
    mockUpdateUserUseCase = {
      execute: jest.fn(),
    } as unknown as DefaultUpdateUserUseCase;
  });

  it('should execute the use case with the given command', async () => {
    const command = new UpdateUserCommand(id, 'Fernando', 'update@gmail.com');

    (mockUpdateUserUseCase.execute as jest.Mock).mockResolvedValue(undefined);

    await mockUpdateUserUseCase.execute(command);

    expect(mockUpdateUserUseCase.execute).toHaveBeenCalledWith(command);
  });

  it('should throw an error if use case execution fails', async () => {
    const command = new UpdateUserCommand(
      id,
      'Updated Name',
      'updated@example.com',
    );

    (mockUpdateUserUseCase.execute as jest.Mock).mockRejectedValue(
      new Error('Execution error'),
    );

    await expect(mockUpdateUserUseCase.execute(command)).rejects.toThrow(
      'Execution error',
    );
    expect(mockUpdateUserUseCase.execute).toHaveBeenCalledWith(command);
  });
});
