import express, {Application} from 'express';
import morgan from 'morgan';
import cors from 'cors';

import productRoute from './routes/productRoute';
import loginRoute from './routes/loginRoute';
import cartRoute from './routes/cartRoute';
import userRoute from './routes/userRoute';

class Server{

    public app: Application; 

    constructor(){
        this.app = express();
        this.config();
        this.routes();
    }

    config(): void{
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
    }

    routes(): void{
        this.app.use('/api/auth', loginRoute);
        this.app.use("/api/product", productRoute);
        this.app.use('/api/cart',cartRoute);
        this.app.use('/api/users', userRoute);
    }

    start(): void{
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port ', this.app.get('port'));
        });
    }
}

const server = new Server();
server.start();