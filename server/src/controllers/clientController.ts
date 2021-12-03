import {Request, Response} from 'express';
import pool from '../database';

class ClientController{
    public async list (req: Request, res: Response) { 
        const products = await pool.query('SELECT * FROM client');
        res.json(products);
    }
    public async getOne (req: Request, res: Response): Promise<any>{
        const { id } = req.params;
        const products = await pool.query('SELECT * FROM client WHERE client_id = ?', [id]);
        if(products.length > 0){
            return res.json(products[0]);
        }
        res.status(404).json({ text: 'product not found' });
    }
}

export const clientController = new ClientController();