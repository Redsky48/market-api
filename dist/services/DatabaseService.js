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
Object.defineProperty(exports, "__esModule", { value: true });
const ts_log_debug_1 = require("ts-log-debug");
const common_1 = require("@tsed/common");
const typeorm_1 = require("typeorm");
let DatabaseService = class DatabaseService {
    constructor() {
        this.connections = {};
        // create connection
        typeorm_1.createConnection()
            .then(connection => {
            this.connections.default = connection;
            ts_log_debug_1.$log.info("Connected to database.");
        }).catch(err => {
            ts_log_debug_1.$log.error(err);
        });
    }
    getConnection(name = 'default') {
        return this.connections[name];
    }
};
DatabaseService = __decorate([
    common_1.Service(),
    __metadata("design:paramtypes", [])
], DatabaseService);
exports.DatabaseService = DatabaseService;
//# sourceMappingURL=DatabaseService.js.map