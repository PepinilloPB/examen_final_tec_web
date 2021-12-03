import {Request, Response} from 'express';
import pool from '../database';

class SaleController{
    public async create (req: Request, res: Response): Promise<void> {
        await pool.query(' INSERT INTO sale ' + 
                         ' (sale_client_id, sale_product_id, sale_payment_type, sale_payment_amount , sale_date) ' + 
                         ' VALUES ( ? , ? , ?, ?, current_date()) ', 
                         [req.body.sale_client_id, req.body.sale_product_id, 
                            req.body.sale_payment_type, req.body.sale_payment_amount]);
        console.log(req.body);
        res.json({message: 'product saved'});
    }
}

export const saleController = new SaleController();