import "@tsed/swagger";
import { $log } from "ts-log-debug";

var fs = require('fs');

import Path = require("path");
import { ServerSettings, ServerLoader, GlobalAcceptMimesMiddleware, GlobalErrorHandlerMiddleware, AuthenticatedMiddleware } from "@tsed/common";
const rootDir = Path.resolve(__dirname);



var https = require('https');
// var key= fs.readFileSync("./server.key");
// var cert= fs.readFileSync("./server.crt");
// var credentials = {key: key, cert: cert};
var express = require('express');
var app = express();


// var httpsServer = https.createServer(credentials, app);
// httpsServer.listen(8443);

@ServerSettings({
    rootDir, // optional. By default it's equal to process.cwd()
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
export class Server extends ServerLoader {

    /**
     * This method let you configure the middleware required by your application to works.
     * @returns {Server}
     */
    public $onMountingMiddlewares(): void | Promise<any> {

        const cookieParser = require('cookie-parser'),
            bodyParser = require('body-parser'),
            compress = require('compression'),
            methodOverride = require('method-override'),
            morgan = require('morgan'),
            cors = require('cors'),
            prerender=(require('prerender-node'));

        this
            .use(morgan('dev'))
            .use(GlobalAcceptMimesMiddleware)
			.use(cors())
            .use(cookieParser())
            .use(compress({}))
			.use(methodOverride())
            .use(bodyParser.json({ limit: '10mb' }))
            .use(bodyParser.urlencoded({ extended: true, limit: '10mb' }))
            .use(prerender);

        return null;
    }

    public $afterRoutesInit() {
        this.use(GlobalErrorHandlerMiddleware);
    }

    public $onReady() {
        $log.info('Server started...');
    }

    public $onServerInitError(err) {
        $log.error(err);
    }
}

