import UserID from '@/domain/value-objects/user-id.vo';
import DefaultDeleteUserUseCase from './default-delete-user.usecase';
import { randomUUID } from 'crypto';

describe('DefaultDeleteUserUseCase', () => {
  const id = randomUUID();
  let mockDeleteUseCase: DefaultDeleteUserUseCase;

  beforeEach(() => {
    mockDeleteUseCase = {
      execute: jest.fn(),
    } as unknown as DefaultDeleteUserUseCase;
  });

  it('should execute the use case with the given UserID', async () => {
    const userID = UserID.fromString(id);

    (mockDeleteUseCase.execute as jest.Mock).mockResolvedValue(undefined);

    await mockDeleteUseCase.execute(userID);

    expect(mockDeleteUseCase.execute).toHaveBeenCalledWith(userID);
  });

  it('should throw an error if use case execution fails', async () => {
    const userID = UserID.fromString(id);

    (mockDeleteUseCase.execute as jest.Mock).mockRejectedValue(
      new Error('Execution error'),
    );

    await expect(mockDeleteUseCase.execute(userID)).rejects.toThrow(
      'Execution error',
    );
    expect(mockDeleteUseCase.execute).toHaveBeenCalledWith(userID);
  });
});
