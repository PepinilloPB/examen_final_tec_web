import { Request, Response } from 'express';

import pool from '../database';

class UserController{
    public index (req: Request, res: Response) { 
        res.send('Hello from user');
    }
    public async list (req: Request, res: Response) { 
        const users = await pool.query('SELECT * FROM task_user');
        res.json({users: users, token: req.headers.authorization});
    }
    public async create (req: Request, res: Response): Promise<void> {
        //req.body.user_password = (req.body.user_password);
        //res.json({body: req.body});
        await pool.query('INSERT INTO task_user (user_name, user_password) VALUES (?, ?)', 
                        [req.body.user_name, req.body.user_password]);
        res.json({message: 'User saved'});
    }
    public async getOne (req: Request, res: Response): Promise<any>{
        const { id } = req.params;
        const tasks = await pool.query('SELECT id, user_name FROM task_user WHERE id = ?', [id]);
        if(tasks.length > 0){
            return res.json(tasks[0]);
        }
        res.status(404).json({ text: 'User not found' });
    }
}

export const userController = new UserController();