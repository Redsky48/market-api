"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
require("@tsed/swagger");
const ts_log_debug_1 = require("ts-log-debug");
var fs = require('fs');
const Path = require("path");
const common_1 = require("@tsed/common");
const rootDir = Path.resolve(__dirname);
var https = require('https');
// var key= fs.readFileSync("./server.key");
// var cert= fs.readFileSync("./server.crt");
// var credentials = {key: key, cert: cert};
var express = require('express');
var app = express();
// var httpsServer = https.createServer(credentials, app);
// httpsServer.listen(8443);
let Server = class Server extends common_1.ServerLoader {
    /**
     * This method let you configure the middleware required by your application to works.
     * @returns {Server}
     */
    $onMountingMiddlewares() {
        const cookieParser = require('cookie-parser'), bodyParser = require('body-parser'), compress = require('compression'), methodOverride = require('method-override'), morgan = require('morgan'), cors = require('cors'), prerender = (require('prerender-node'));
        this
            .use(morgan('dev'))
            .use(common_1.GlobalAcceptMimesMiddleware)
            .use(cors())
            .use(cookieParser())
            .use(compress({}))
            .use(methodOverride())
            .use(bodyParser.json({ limit: '10mb' }))
            .use(bodyParser.urlencoded({ extended: true, limit: '10mb' }))
            .use(prerender);
        return null;
    }
    $afterRoutesInit() {
        this.use(common_1.GlobalErrorHandlerMiddleware);
    }
    $onReady() {
        ts_log_debug_1.$log.info('Server started...');
    }
    $onServerInitError(err) {
        ts_log_debug_1.$log.error(err);
    }
};
Server = __decorate([
    common_1.ServerSettings({
        rootDir,
        acceptMimes: ["application/json"],
        httpPort: 4011,
        httpsPort: 4091,
        // httpsOptions: {
        //     cert: fs.readFileSync("./server.crt"),
        //     key: fs.readFileSync("./server.key")
        // },
        debug: false,
        mount: {
            '/api': `${rootDir}/controllers/**/**.js`,
        },
        componentsScan: [
            `${rootDir}/services/**/**.js`,
            `${rootDir}/middlewares/**/**.js`
        ],
        swagger: {
            path: "/api-docs",
            spec: {
                securityDefinitions: {
                    "basicAuth": {
                        "type": "basic"
                    }
                }
            }
        }
    })
], Server);
exports.Server = Server;
//# sourceMappingURL=server.js.map