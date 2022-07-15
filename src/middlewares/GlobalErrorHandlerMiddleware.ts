import { NextFunction as ExpressNext, Request as ExpressRequest, Response as ExpressResponse } from "express";
import {Exception} from "ts-httpexceptions";
import {$log} from "ts-log-debug";
import { MiddlewareError, IMiddlewareError, Err, Request, Response, Next } from "@tsed/common";

@MiddlewareError()
export class GlobalErrorHandlerMiddleware implements IMiddlewareError {

    use(
        @Err() error: any,
        @Request() request: ExpressRequest,
        @Response() response: ExpressResponse,
        @Next() next: ExpressNext
    ): any {

        if (response.headersSent) {
            return next(error);
        }

        const toHTML = (message = "") => message.replace(/\n/gi, "<br />");

        if (error instanceof Exception) {
            $log.error("" + error);
            response.status(error.status).send(toHTML(error.message));
            return next();
        }

        if (typeof error === "string") {
            response.status(404).send(toHTML(error));
            return next();
        }

        $log.error("" + error);
        response.status(error.status || 500).send("Internal Error");

        return next();
    }
}