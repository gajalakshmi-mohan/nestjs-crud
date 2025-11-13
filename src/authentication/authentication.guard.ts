import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import jwt from 'jsonwebtoken';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const { authorization } = request.headers;
      if (!authorization) {
        throw new UnauthorizedException('No token found');
      }
      const token = authorization && authorization.split(' ')[1];
      console.debug({ authorization, token });

      const decodedToken = jwt.verify(token, '1234');
      return !!decodedToken;
    } catch (error) {
      throw new ForbiddenException('Error validating token');
    }
  }
}
