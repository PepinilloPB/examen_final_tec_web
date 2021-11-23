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
exports.userController = void 0;
const database_1 = __importDefault(require("../database"));
class UserController {
    index(req, res) {
        res.send('Hello from user');
    }
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield database_1.default.query('SELECT * FROM task_user');
            res.json({ users: users, token: req.headers.authorization });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //req.body.user_password = (req.body.user_password);
            //res.json({body: req.body});
            yield database_1.default.query('INSERT INTO task_user (user_name, user_password) VALUES (?, ?)', [req.body.user_name, req.body.user_password]);
            res.json({ message: 'User saved' });
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const tasks = yield database_1.default.query('SELECT id, user_name FROM task_user WHERE id = ?', [id]);
            if (tasks.length > 0) {
                return res.json(tasks[0]);
            }
            res.status(404).json({ text: 'User not found' });
        });
    }
}
exports.userController = new UserController();
