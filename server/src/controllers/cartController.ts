import {Request, Response} from 'express';

const products: any[] = [];

class CartController{
    
    //games: String[] = [];

    public async listCart (req: Request, res: Response): Promise<void>{ 
        res.json(products);
        //res.send('Hello, Index');
    }

    public async saveInCart (req: Request, res: Response): Promise<void> { 
        products.push(req.body);
        res.json({message: 'Game saved'});
    }

    public async removeFromCart(req: Request, res: Response): Promise<void> { 
        var index = products.findIndex(product => product.product_id == req.params.id);

        //console.log("Index: " + index);
        //console.log("ID: " + req.params.id);
        //res.send(games[index]);
        if (index > -1) {
            products.splice(index, 1);
            res.json({message: 'Game deleted'});
        } else {
            res.sendStatus(404);
        }
    }
}

export const cartController = new CartController();