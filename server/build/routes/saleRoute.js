"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const saleController_1 = require("../controllers/saleController");
class SaleRoute {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        //this.router.get('/', (req, res) => res.send('Hello, Games'));
        this.router.post('/', saleController_1.saleController.create);
    }
}
const saleRoute = new SaleRoute();
exports.default = saleRoute.router;
