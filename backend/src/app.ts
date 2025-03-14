import express, { json, Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import config from './config.json';
import process from 'process';


const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

const PORT: number = parseInt(process.env.PORT || config.port);
const HOST: string = process.env.IP || 'localhost';

app.get('/', (req: Request, res: Response) => {
    res.send('POST request to the homepage');
});

app.get('/echo', (req: Request, res: Response) => {
    res.json("data");
});
  
app.listen(PORT, HOST, () => {
    console.log(`⚡️ Server started on port ${PORT} at ${HOST}`);
    console.log(`http://${HOST}:${PORT}/`);
});
  
