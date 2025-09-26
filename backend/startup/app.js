import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import errorMiddleware from '../midelware/errorMiddleware.js';
import routes from './routes.js';

const app = express();


app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/',
  })
);


app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));


app.use(cookieParser());
app.use(express.json());


routes(app);


app.use(errorMiddleware);

export default app;
