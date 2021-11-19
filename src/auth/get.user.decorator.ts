import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { User } from "./users.entity";

export const GetUser = createParamDecorator((data, ctx: ExecutionContext): User => {
    console.log(ctx);
    const req = ctx.switchToHttp().getRequest();
    return req.user
})