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
const typeorm_1 = require("typeorm");
let PriceElement = class PriceElement {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], PriceElement.prototype, "id", void 0);
__decorate([
    typeorm_1.Column("varchar"),
    __metadata("design:type", String)
], PriceElement.prototype, "e1", void 0);
__decorate([
    typeorm_1.Column("int"),
    __metadata("design:type", Number)
], PriceElement.prototype, "E", void 0);
__decorate([
    typeorm_1.Column("varchar"),
    __metadata("design:type", String)
], PriceElement.prototype, "s", void 0);
__decorate([
    typeorm_1.Column("int"),
    __metadata("design:type", Number)
], PriceElement.prototype, "t1", void 0);
__decorate([
    typeorm_1.Column("varchar"),
    __metadata("design:type", String)
], PriceElement.prototype, "p", void 0);
__decorate([
    typeorm_1.Column("varchar"),
    __metadata("design:type", String)
], PriceElement.prototype, "q", void 0);
__decorate([
    typeorm_1.Column("int"),
    __metadata("design:type", Number)
], PriceElement.prototype, "b", void 0);
__decorate([
    typeorm_1.Column("int"),
    __metadata("design:type", Number)
], PriceElement.prototype, "a", void 0);
__decorate([
    typeorm_1.Column("int"),
    __metadata("design:type", Number)
], PriceElement.prototype, "T", void 0);
__decorate([
    typeorm_1.Column("boolean"),
    __metadata("design:type", Boolean)
], PriceElement.prototype, "m1", void 0);
__decorate([
    typeorm_1.Column("boolean"),
    __metadata("design:type", Boolean)
], PriceElement.prototype, "M", void 0);
PriceElement = __decorate([
    typeorm_1.Entity("prices")
], PriceElement);
exports.PriceElement = PriceElement;
//# sourceMappingURL=Prices.js.map