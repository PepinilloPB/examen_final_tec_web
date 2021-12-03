"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saleController = void 0;
const database_1 = __importDefault(require("../database"));
class SaleController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query(' INSERT INTO sale ' +
                ' (sale_client_id, sale_product_id, sale_payment_type, sale_payment_amount , sale_date) ' +
                ' VALUES ( ? , ? , ?, ?, current_date()) ', [req.body.sale_client_id, req.body.sale_product_id,
                req.body.sale_payment_type, req.body.sale_payment_amount]);
            console.log(req.body);
            res.json({ message: 'product saved' });
        });
    }
}
exports.saleController = new SaleController();
