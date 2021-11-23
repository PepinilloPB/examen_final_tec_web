"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productController_1 = require("../controllers/productController");
class ProductRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        //this.router.get('/', (req, res) => res.send('Hello, Games'));
        this.router.get('/', productController_1.productController.list);
        this.router.get('/:id', productController_1.productController.getOne);
        this.router.post('/', productController_1.productController.create);
        this.router.put('/:id', productController_1.productController.update);
        this.router.delete('/:id', productController_1.productController.delete);
    }
}
const productRoutes = new ProductRoutes();
exports.default = productRoutes.router;
