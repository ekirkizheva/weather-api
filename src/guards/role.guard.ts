import { CanActivate, ExecutionContext, Injectable, mixin, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { jwtConstants } from "src/constants/jtw-secret";

export const RoleGuard = (roles: string[]) => {
    @Injectable()
    class RoleGuardMixin implements CanActivate {

        constructor(public jwtService: JwtService) {}
  
        async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        
        if (!token) {
            throw new UnauthorizedException();
        }
        
        try {
            const payload = await this.jwtService.verifyAsync(
            token,
            {
                secret: jwtConstants.secret
            }
            );
            // 💡 We're assigning the payload to the request object here
            // so that we can access it in our route handlers
            request['user'] = payload;

            if (payload.role !== 'admin' && !roles.includes(payload.role)) {
                // If user is not admin and not enlisted role
                throw new UnauthorizedException();
            }

        } catch (error) {
            throw new UnauthorizedException();
        }
        return true;
        }
    
        public extractTokenFromHeader(request: Request & { headers: { authorization: string } }): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
        }
    }
  
    const guard = mixin(RoleGuardMixin);
    return guard;
  }