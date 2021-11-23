import { Router } from 'express';

import { userController } from '../controllers/userController';

class UserRoutes{

    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.get('/', userController.list);
        this.router.get('/:id', userController.getOne);
        this.router.post('/', userController.create);
    }
}

const userRoutes = new UserRoutes();
export default userRoutes.router;