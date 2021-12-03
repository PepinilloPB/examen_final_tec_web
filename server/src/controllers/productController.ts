import {Request, Response} from 'express';
import pool from '../database';

class ProductController{
    public async list (req: Request, res: Response) { 
        const products = await pool.query('SELECT * FROM product');
        res.json(products);
    }
    public async getOne (req: Request, res: Response): Promise<any>{
        const { id } = req.params;
        const products = await pool.query('SELECT * FROM product WHERE product_id = ?', [id]);
        if(products.length > 0){
            return res.json(products[0]);
        }
        res.status(404).json({ text: 'product not found' });
    }
    public async create (req: Request, res: Response): Promise<void> {
        await pool.query('INSERT INTO product SET ?', [req.body]);
        console.log(req.body);
        res.json({message: 'product saved'});
    }
    public async update (req: Request, res: Response): Promise<void>{
        const { id } = req.params;
        await pool.query('UPDATE product SET ? WHERE product_id = ?', [req.body, id]);
        res.json({message: 'product updated'});
    }
    public async delete (req: Request, res: Response): Promise<void>{
        const { id } = req.params;
        await pool.query('DELETE FROM product WHERE product_id = ?', [id]);
        res.json({message: 'product deleted'});
    }
}

export const productController = new ProductController();