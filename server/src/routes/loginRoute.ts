import { Router } from 'express';

import { loginController } from '../controllers/loginController';

class LoginRoutes{

    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.get('/', loginController.index);
        this.router.post('/client', loginController.signInClient);
        this.router.post('/employee', loginController.signInEmployee);
    }
}

const loginRoutes = new LoginRoutes();
export default loginRoutes.router;