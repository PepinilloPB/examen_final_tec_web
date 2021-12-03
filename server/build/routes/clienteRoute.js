"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const clientController_1 = require("../controllers/clientController");
class ClientRoute {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', clientController_1.clientController.list);
        this.router.get('/:id', clientController_1.clientController.getOne);
    }
}
const clientRoute = new ClientRoute();
exports.default = clientRoute.router;
