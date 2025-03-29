import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

@Injectable()
export class RoleGuard implements CanActivate{

    constructor(private reflector: Reflector) {}

    async canActivate(context:ExecutionContext){
        const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
        if (!requiredRoles) return true;

        const request = context.switchToHttp().getRequest();
        const user = request.user;
        console.log('User in Guard:', user);  
        return requiredRoles.includes(user.role);
    }
}