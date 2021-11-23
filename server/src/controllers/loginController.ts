import {Request, Response} from 'express';
import pool from '../database';

var jwt = require('jsonwebtoken');
var tkn: string;

class LoginController{
    public async index (req: Request, res: Response): Promise<void> {
        //res.json(req.body);
        //const token = req.headers.authorization;
        if(tkn){   
            //res.json(tkn);
            req.headers.authorization = tkn;
            const tokenObject = validateToken(req.headers.authorization);
            if(tokenObject){
                console.log('Auth correct: ' + tokenObject);
            }
            else{ 
                res.status(403).json({text: 'User not authorizated in list'}); 
                return;
            }
            res.json(req);
        }else{
            res.status(401).json({text: 'Token failed'}); 
            return;
        }
    }

    public async signIn (req: Request, res: Response): Promise<any>{
        //res.json(req.body.user_password);
        const password = req.body.user_password;
        const user = await pool.query('SELECT user_id, user_name FROM user WHERE user_name = ? AND user_password = ?', 
                                     [req.body.user_name, password]);
        if(user.length == 1){
            //res.json({user: user});
            tkn = buildToken(user[0].id, user[0].user_name);
            //req.headers.authorization = tkn;
            //res.json(token);
            //res.json({token: token});
            res.json({headers: req.headers, token: tkn});
        }else{
            res.status(401).json({text: 'User not authorizated 401'}); 
        }
    }
}

function buildToken(id: String, user_name: String){
    const payload = {
        id: id,
        user_name: user_name,
        exp: Math.floor(Date.now() / 1000) + (60 * 2)
    }
    return jwt.sign(payload, '112233');
}

function validateToken(token: String | undefined){
    try{
        const jwtObject = jwt.verify(token, '112233');
        return jwtObject;
    }catch(err){
        return null;
    }
}

export const loginController = new LoginController();