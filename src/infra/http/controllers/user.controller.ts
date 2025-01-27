import IUserService from '@/application/services/user-service.interface';
import { TYPES } from '@/infra/config/di/types';
import { Request } from 'express';
import { inject } from 'inversify';
import {
  BaseHttpController,
  controller,
  httpDelete,
  httpGet,
  httpPost,
  httpPut,
  request,
} from 'inversify-express-utils';
import { authenticate } from '../middleware/private-route.middleware';
import BadRequestError from '@/domain/exceptions/bad-request-exception';

interface DeleteRequest extends Request {
  user: {
    id: string;
  };
}
@controller('/users')
export default class UserController extends BaseHttpController {
  @inject(TYPES.UserService)
  private readonly userService!: IUserService;

  @httpPost('/')
  async create(@request() req: Request) {
    const user = await this.userService.createUser(req.body);
    return this.created(`/users`, user);
  }

  @httpGet('/', authenticate)
  async list() {
    const users = await this.userService.listUsers();
    return this.ok(users);
  }

  @httpGet('/:id', authenticate)
  async findById(@request() req: Request) {
    const user = await this.userService.getUser(req.params.id);
    return this.ok(user);
  }

  @httpPut('/:id', authenticate)
  async update(@request() req: Request) {
    await this.userService.updateUser({
      id: req.params.id,
      ...req.body,
    });

    return this.ok();
  }

  @httpDelete('/:id', authenticate)
  async delete(@request() req: DeleteRequest) {
    if (req.user.id === req.params.id) {
      throw new BadRequestError({
        message: 'You can not delete  yourself',
        context: {
          id: req.params.id,
        },
      });
    }
    await this.userService.deleteUser(req.params.id);
    return this.ok();
  }
}
