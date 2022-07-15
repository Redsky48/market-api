"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const ts_httpexceptions_1 = require("ts-httpexceptions");
const ts_log_debug_1 = require("ts-log-debug");
const common_1 = require("@tsed/common");
let GlobalErrorHandlerMiddleware = class GlobalErrorHandlerMiddleware {
    use(error, request, response, next) {
        if (response.headersSent) {
            return next(error);
        }
        const toHTML = (message = "") => message.replace(/\n/gi, "<br />");
        if (error instanceof ts_httpexceptions_1.Exception) {
            ts_log_debug_1.$log.error("" + error);
            response.status(error.status).send(toHTML(error.message));
            return next();
        }
        if (typeof error === "string") {
            response.status(404).send(toHTML(error));
            return next();
        }
        ts_log_debug_1.$log.error("" + error);
        response.status(error.status || 500).send("Internal Error");
        return next();
    }
};
__decorate([
    __param(0, common_1.Err()),
    __param(1, common_1.Request()),
    __param(2, common_1.Response()),
    __param(3, common_1.Next()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Function]),
    __metadata("design:returntype", Object)
], GlobalErrorHandlerMiddleware.prototype, "use", null);
GlobalErrorHandlerMiddleware = __decorate([
    common_1.MiddlewareError()
], GlobalErrorHandlerMiddleware);
exports.GlobalErrorHandlerMiddleware = GlobalErrorHandlerMiddleware;
//# sourceMappingURL=GlobalErrorHandlerMiddleware.js.map