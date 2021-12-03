"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const loginController_1 = require("../controllers/loginController");
class LoginRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', loginController_1.loginController.index);
        this.router.post('/client', loginController_1.loginController.signInClient);
        this.router.post('/employee', loginController_1.loginController.signInEmployee);
    }
}
const loginRoutes = new LoginRoutes();
exports.default = loginRoutes.router;
