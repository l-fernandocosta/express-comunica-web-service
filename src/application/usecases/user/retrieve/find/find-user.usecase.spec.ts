import User from '@/domain/entities/user.entity';
import UserID from '@/domain/value-objects/user-id.vo';
import { randomUUID } from 'crypto';
import DefaultFindUserUseCase from './default-find-user-usecase';

describe('DefaultFindUserUseCase', () => {
  const id = randomUUID();
  let mockFindUseCase: DefaultFindUserUseCase;

  beforeEach(() => {
    mockFindUseCase = {
      execute: jest.fn(),
    } as unknown as DefaultFindUserUseCase;
  });

  it('should execute the use case with the given UserID and return a user', async () => {
    const userID = UserID.fromString(id);

    const userEntity = User.create({
      email: 'randomemail@gmail.com',
      name: 'Fernando',
      password: '@Password@123!',
      id,
    });

    (mockFindUseCase.execute as jest.Mock).mockResolvedValue(userEntity);

    const result = await mockFindUseCase.execute(userID);

    expect(mockFindUseCase.execute).toHaveBeenCalledWith(userID);
    expect(result).toEqual(userEntity);
  });

  it('should throw an error if use case execution fails', async () => {
    const userID = UserID.fromString(id);

    (mockFindUseCase.execute as jest.Mock).mockRejectedValue(
      new Error('Execution error'),
    );

    await expect(mockFindUseCase.execute(userID)).rejects.toThrow(
      'Execution error',
    );
    expect(mockFindUseCase.execute).toHaveBeenCalledWith(userID);
  });
});
