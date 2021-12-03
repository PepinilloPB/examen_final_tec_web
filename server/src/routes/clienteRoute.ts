import { Router } from 'express';

import { clientController } from '../controllers/clientController';

class ClientRoute{
    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.get('/', clientController.list);
        this.router.get('/:id', clientController.getOne);
    }
}

const clientRoute = new ClientRoute();
export default clientRoute.router;