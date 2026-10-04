import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response, Request, NextFunction } from 'express';
import { UsersService } from '../users.service.js';
import { User } from '../user.entity.js';

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private readonly userService: UsersService) {}

  async use(req: Request, _res: Response, next: NextFunction) {
    const { userId } = req.session || {};

    if (!userId) return next();

    const user = await this.userService.findOne(userId);

    req.currentUser = user;

    next();
  }
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: User | null;
    }
  }
}
