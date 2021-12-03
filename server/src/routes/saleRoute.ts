import { Router } from 'express';

import { saleController } from '../controllers/saleController';

class SaleRoute{
    
    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void{
        //this.router.get('/', (req, res) => res.send('Hello, Games'));
        this.router.post('/', saleController.create);
    }
}

const saleRoute = new SaleRoute();
export default saleRoute.router;