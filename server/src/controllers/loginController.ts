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
            const tokenObject = validateTokenClient(req.headers.authorization);
            if(tokenObject){
                console.log('Auth correct: ' + tokenObject);
                /*const clients = await pool.query('SELECT * FROM client');*/
                res.json(tokenObject);
            }else{
                const tokenObject = validateTokenEmployee(req.headers.authorization);
                if(tokenObject){
                    console.log('Auth correct: ' + tokenObject);
                    /*const employees = await pool.query('SELECT * FROM employee');
                    res.json(employees);*/
                    res.json(tokenObject);
                }else{
                    res.status(403).json({text: 'User not authorizated in list'}); 
                    return;
                }
            }
            //res.json(req);
        }else{
            res.status(401).json({text: 'Token failed'}); 
            return;
        }
    }

    public async signInClient (req: Request, res: Response): Promise<any>{
        //res.json(req.body.user_password);
        const password = req.body.user_password;
        const user = await pool.query(' SELECT u.user_id, u.user_name, c.client_firstname, c.client_lastname, c.client_ci ' + 
                                      ' FROM User u, Client c ' + 
                                      ' WHERE u.user_name = ? ' + 
                                      ' AND u.user_password = ? ', 
                                     [req.body.user_name, password]);
        if(user.length == 1){
            //res.json({user: user});
            tkn = buildTokenClient(user[0].user_id, user[0].user_name, user[0].client_firstname , user[0].client_lastname , user[0].client_ci);
            //req.headers.authorization = tkn;
            //res.json(token);
            //res.json({token: token});
            res.json(tkn);
        }else{
            res.status(401).json({text: 'User not authorizated 401'}); 
        }
    }

    public async signInEmployee (req: Request, res: Response): Promise<any>{
        //res.json(req.body.user_password);
        const password = req.body.user_password;
        const user = await pool.query(' SELECT u.user_id, u.user_name, e.employee_firstname, e.employee_lastname, e.employee_ci ' + 
                                      ' FROM User u, Employee e ' + 
                                      ' WHERE u.user_name = ? ' + 
                                      ' AND u.user_password = ? ', 
                                     [req.body.user_name, password]);
        if(user.length == 1){
            //res.json({user: user});
            tkn = buildTokenEmployee(user[0].id, user[0].user_name, user[0].employee_firstname, user[0].employee_lastname, user[0].employee_ci);
            //req.headers.authorization = tkn;
            //res.json(token);
            //res.json({token: token});
            res.json({headers: req.headers, token: tkn});
        }else{
            res.status(401).json({text: 'User not authorizated 401'}); 
        }
    }
}

function buildTokenClient(id: String, user_name: String, client_firstname: String, client_lastname: String, client_ci: String){
    const payload = {
        id: id,
        user_name: user_name,
        client_firstname: client_firstname,
        client_lastname: client_lastname,
        client_ci: client_ci,
        exp: Math.floor(Date.now() / 1000) + (60 * 2)
    }
    return jwt.sign(payload, '112233');
}

function buildTokenEmployee(id: String, user_name: String, employee_firstname: String, employee_lastname: String, employee_ci: String){
    const payload = {
        id: id,
        user_name: user_name,
        employee_firstname: employee_firstname,
        employee_lastname: employee_lastname,
        employee_ci: employee_ci,
        exp: Math.floor(Date.now() / 1000) + (60 * 2)
    }
    return jwt.sign(payload, '332211');
}

function validateTokenClient(token: String | undefined){
    try{
        const jwtObject = jwt.verify(token, '112233');
        return jwtObject;
    }catch(err){
        return null;
    }
}

function validateTokenEmployee(token: String | undefined){
    try{
        const jwtObject = jwt.verify(token, '332211');
        return jwtObject;
    }catch(err){
        return null;
    }
}

export const loginController = new LoginController();