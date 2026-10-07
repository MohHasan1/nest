import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { UsersService } from '../users.service.js';

// not in use we use interceptor to get the current user
@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(private readonly userService: UsersService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest();
    const userId = req.session.userId || null; // is decrypted and injected into req by nest and cookie-session (middlewares - as middleware runs before interceptors)
    if (!userId) return next.handle();

    const user = await this.userService.findOne(userId);
    req.currentUser = user;

    return next.handle();
  }
}
