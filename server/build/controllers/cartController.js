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
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartController = void 0;
const products = [];
class CartController {
    //games: String[] = [];
    listCart(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.json(products);
            //res.send('Hello, Index');
        });
    }
    saveInCart(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            products.push(req.body);
            res.json({ message: 'Game saved' });
        });
    }
    removeFromCart(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var index = products.findIndex(product => product.product_id == req.params.id);
            //console.log("Index: " + index);
            //console.log("ID: " + req.params.id);
            //res.send(games[index]);
            if (index > -1) {
                products.splice(index, 1);
                res.json({ message: 'Game deleted' });
            }
            else {
                res.sendStatus(404);
            }
        });
    }
}
exports.cartController = new CartController();
