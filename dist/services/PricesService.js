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
const DatabaseService_1 = require("./DatabaseService");
const Prices_1 = require("../entity/Prices");
let PricesService = class PricesService {
    constructor(databaseService) {
        this.databaseService = databaseService;
    }
    manager(queryRunner) {
        if (!queryRunner) {
            return this.databaseService.getConnection().getRepository(Prices_1.PriceElement);
        }
        else {
            return queryRunner.manager.getRepository(Prices_1.PriceElement);
        }
    }
    findOne(params, queryRunner) {
        return this.manager(queryRunner).findOne(params);
    }
    findOneByID(id, queryRunner) {
        return this.manager(queryRunner).findOne(id);
    }
    findOneBySymbol(market, queryRunner) {
        return this.manager(queryRunner).findOne({ market: market });
    }
    findAll(queryRunner) {
        return this.manager(queryRunner).find();
    }
    save(PriceElement, queryRunner) {
        return this.manager(queryRunner).save(PriceElement);
    }
    delete(id, queryRunner) {
        return this.manager(queryRunner).delete({ id: id });
    }
    runQuery(query) {
        return __awaiter(this, void 0, void 0, function* () {
            let result;
            result = yield this.databaseService.getConnection().query(query);
            return result;
        });
    }
};
PricesService = __decorate([
    common_1.Service(),
    __metadata("design:paramtypes", [DatabaseService_1.DatabaseService])
], PricesService);
exports.PricesService = PricesService;
//# sourceMappingURL=PricesService.js.map