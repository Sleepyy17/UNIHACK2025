import express, { Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import config from './config.json';
import process from 'process';
import * as users from './user';
import { getData, loadDataStore, saveDataStore, setData } from './dataStore';

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

const PORT: number = parseInt(process.env.PORT || config.port);
const HOST: string = process.env.IP || 'localhost';

app.get('/', (req: Request, res: Response) => {
    res.send('POST request to the homepage');
});

app.delete('/clear', (req: Request, res: Response) => {
    setData({ users: []});
    res.status(200).json({})
})

app.post('/user/register', (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const response = users.userRegister(email, password);
        res.status(200).json(response);
        saveDataStore();
    } catch (err) {
        res.status(400).json(err.message);
    }
});

app.post('/user/login', (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const response = users.userLogin(email, password);
        res.status(200).json(response);
        saveDataStore();
    } catch (err) {
        res.status(400).json(err.message);
    }
});

app.get('/dataStore', (req: Request, res: Response) => {
    res.json(getData());
});

app.get('/echo', (req: Request, res: Response) => {
    res.json("data");
});
  
app.listen(PORT, HOST, () => {
    loadDataStore()
    console.log(`⚡️ Server started on port ${PORT} at ${HOST}`);
    console.log(`http://${HOST}:${PORT}/`);
});
  
