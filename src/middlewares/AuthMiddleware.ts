
import * as passport from 'passport';
import * as passportjwt from 'passport-jwt';
import * as crypto from 'crypto';
import * as IpFilter from 'ip-filter';

import { AuthenticatedMiddleware, OverrideMiddleware, EndpointInfo, EndpointMetadata, Req, Res, Next } from "@tsed/common";
import { Forbidden } from "ts-httpexceptions";
import { $log } from 'ts-log-debug';


declare module 'express' {
    interface Request {
     
    }
}
/*
@OverrideMiddleware(AuthenticatedMiddleware)
export class AuthMiddleware {
    private jwtConfig: {
        jwtFromRequest: any,
        secretOrKey: string,
        issuer?: string,
        audience?: string,
    };
    constructor(
        private userService: UserService
    ) {
        this.init();
    }

    private async init(){
        this.jwtConfig = {
            jwtFromRequest: passportjwt.ExtractJwt.fromHeader('authorization'),
            secretOrKey: process.env.JWT_SECRET,
            issuer: process.env.JWT_ISSUER,
            audience: process.env.JWT_AUDIENCE,
        }
        passport.use(new passportjwt.Strategy(this.jwtConfig, async (payload, done) => {
            // get user
            try {
                let user = await this.userService.findOne(payload.username);
            
                if (user) {
                    delete user.password;
                    delete user.salt;

                    return done(null, user);
                } else {
                    return done(null, false);
                }
            } catch (err) {
                $log.error(err);
                return done(err, false);
            }
        }));
    }

    async use( 
        @EndpointInfo() endpoint: EndpointMetadata,
        @Req() request: Express.Request,
        @Res() response: Express.Response,
        @Next() next: Express.NextFunction
    ) {
        let options = endpoint.store.get(AuthenticatedMiddleware);
        if (!options || !options.role) {
            options = {role: 'jwt'};
        }
        
        switch (options.role) {
            case 'jwt': await this.authJWT(request, response, next); break;
            default: throw new Forbidden("Forbidden");
        }
    }

    private async authJWT(request: Express.Request, response: Express.Response, next: Express.NextFunction){
        return passport.authenticate("jwt", {session: false})(request, response, next);
    }
}
*/