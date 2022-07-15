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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@tsed/common");
const PricesService_1 = require("../services/PricesService");
const Prices_1 = require("../entity/Prices");
const WebSocket = require('ws');
let streams = [
    'btcusdt',
    'ethusdt'
];
let sockets = {};
let RestCtrl = class RestCtrl {
    constructor(prices) {
        this.prices = prices;
        this.timeKeeper = {};
        this.initiateStreams();
    }
    initiateStreams() {
        for (let market of streams) {
            sockets[market] = new WebSocket(`wss://stream.binance.com:9443/ws/${market}@trade`);
            this.runStream(market);
        }
    }
    runStream(market) {
        console.log('stream on market ' + market + ' runned');
        sockets[market].on('message', (dataBlob) => {
            this.publicSaveNewPrice(JSON.parse(dataBlob));
        });
    }
    publicSaveNewPrice(data) {
        return __awaiter(this, void 0, void 0, function* () {
            let newPrice = yield new Prices_1.PriceElement();
            newPrice.E = data.E;
            newPrice.M = data.M;
            newPrice.T = data.T;
            newPrice.a = data.a;
            newPrice.b = data.b;
            newPrice.e1 = data.e;
            newPrice.m1 = data.m;
            newPrice.p = data.p;
            newPrice.q = data.q;
            newPrice.s = data.s;
            newPrice.t1 = data.t;
            yield this.prices.save(newPrice);
            this.timeLogger(newPrice.s);
        });
    }
    timeLogger(symbol) {
        let now = new Date().getTime();
        if (!this.timeKeeper[symbol]) {
            this.timeKeeper[symbol] = now;
        }
        let lastTime = this.timeKeeper[symbol];
        let seconds = (((now - lastTime) % 60000) / 1000).toFixed(3);
        console.log(symbol + ' - ' + seconds);
        this.timeKeeper[symbol] = now;
    }
};
RestCtrl = __decorate([
    common_1.Controller("/prices"),
    __metadata("design:paramtypes", [PricesService_1.PricesService])
], RestCtrl);
exports.RestCtrl = RestCtrl;
//# sourceMappingURL=PricesCtrl.js.map