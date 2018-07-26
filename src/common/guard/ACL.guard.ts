import { Guard, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs/Observable';
import { Reflector } from '@nestjs/core';

@Guard()
export class ACLGuard implements CanActivate {

    constructor(private readonly reflector: Reflector) { }

    canActivate(dataOrRequest, context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const { parent, handler } = context;
        const roles = this.reflector.get<string[]>('roles', handler);
        if (!roles) {
            return true;
        }

        const user = dataOrRequest.user;

        // inline function 
        const hasRole = () => !!user.roles.find((role) => !!roles.find((item) => item === role));

        return user && user.roles && hasRole();

    }
}