import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { map, Observable } from 'rxjs';

type TClassConstructor = {
  new (...args: any[]): {};
};

// Decorator
export function Serialize(dto: TClassConstructor) {
  return UseInterceptors(new SerializeInterceptor(dto));
}

// Custom Interceptor
export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: TClassConstructor) {}

  intercept(
    _context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    // run smt before it goes to the controller: incoming
    // console.log('before handler', _context);

    // run after the controller: outgoing
    return next.handle().pipe(
      map((data: unknown) => {
        return plainToClass(this.dto, data, {
          excludeExtraneousValues: true, // imp - only allows @Expose()
        });
      }),
    );
  }
}
