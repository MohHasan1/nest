import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (_data: never, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    return req.currentUser;
  },
);

export const ConstString = createParamDecorator(() => {
  return 'Hello world';
});
