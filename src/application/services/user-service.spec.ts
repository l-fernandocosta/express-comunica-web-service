import User from '@/domain/entities/user.entity';
import CreateUserDTO from '../dto/user/create-user.dto';
import IUserService from './user-service.interface';

// Mocks para os métodos da interface
const mockListUsers = jest.fn();
const mockGetUser = jest.fn();
const mockDeleteUser = jest.fn();
const mockCreateUser = jest.fn();
const mockUpdateUser = jest.fn();
const mockFindByEmail = jest.fn();

const userService: IUserService = {
  listUsers: mockListUsers,
  getUser: mockGetUser,
  deleteUser: mockDeleteUser,
  createUser: mockCreateUser,
  updateUser: mockUpdateUser,
  findByEmail: mockFindByEmail,
};

describe('UserService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('listUsers', () => {
    it('should return an array of users', async () => {
      const users: User[] = [
        User.create({
          email: 'fernando@gmail.com',
          name: 'Name',
          password: 'Password@123!',
        }),
      ];
      mockListUsers.mockResolvedValue(users);

      const result = await userService.listUsers();

      expect(result).toEqual(users);
      expect(mockListUsers).toHaveBeenCalled();
    });
  });

  describe('getUser', () => {
    it('should return a user by ID', async () => {
      const user: User = User.create({
        email: 'random@gmail.com',
        name: 'John Doe',
        password: 'password@123@',
      });
      mockGetUser.mockResolvedValue(user);

      const result = await userService.getUser('1');

      expect(result).toEqual(user);
      expect(mockGetUser).toHaveBeenCalledWith('1');
    });

    it('should return null if user is not found', async () => {
      mockGetUser.mockResolvedValue(null);

      const result = await userService.getUser('nonexistent-id');

      expect(result).toBeNull();
      expect(mockGetUser).toHaveBeenCalledWith('nonexistent-id');
    });
  });

  describe('deleteUser', () => {
    it('should delete a user successfully', async () => {
      mockDeleteUser.mockResolvedValue(undefined);

      await userService.deleteUser('1');

      expect(mockDeleteUser).toHaveBeenCalledWith('1');
    });
  });

  describe('createUser', () => {
    it('should create and return a new user', async () => {
      const createUserDTO: CreateUserDTO = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password@123@',
      };
      const newUser: User = User.create(createUserDTO);
      mockCreateUser.mockResolvedValue(newUser);

      const result = await userService.createUser(createUserDTO);

      expect(result).toEqual(newUser);
      expect(mockCreateUser).toHaveBeenCalledWith(createUserDTO);
    });
  });

  describe('updateUser', () => {
    it('should update user successfully', async () => {
      const updateUserDTO: Partial<CreateUserDTO> = { name: 'Updated Name' };
      mockUpdateUser.mockResolvedValue(undefined);

      await userService.updateUser(updateUserDTO);

      expect(mockUpdateUser).toHaveBeenCalledWith(updateUserDTO);
    });
  });

  describe('findByEmail', () => {
    it('should return a user by email', async () => {
      const user: User = User.create({
        email: 'jhon@gmail.com',
        name: 'John Doe',
        password: 'password@123@',
      });
      mockFindByEmail.mockResolvedValue(user);

      const result = await userService.findByEmail('john@example.com');

      expect(result).toEqual(user);
      expect(mockFindByEmail).toHaveBeenCalledWith('john@example.com');
    });

    it('should return null if no user is found by email', async () => {
      mockFindByEmail.mockResolvedValue(null);

      const result = await userService.findByEmail('nonexistent@example.com');

      expect(result).toBeNull();
      expect(mockFindByEmail).toHaveBeenCalledWith('nonexistent@example.com');
    });
  });
});
