
import bodyParser from 'body-parser';
import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import multer from 'multer';
import mongoose from 'mongoose';
import globalRouter from './routers/globalRouter';
import userRouter from './routers/userRouter';
import videoRouter from './routers/videoRouter';
import routes from './routes';

const app=express();
app.use(morgan("dev"));//common,tiny,dev
app.use(helmet()); //for security
app.use(cookieParser());//handle cookie  
app.use(cors());//cross-domain
app.use(bodyParser.urlencoded({extended:true}));// parse application/x-www-form-urlencoded
app.use(bodyParser.json());// parse application/json
app.use('/static',express.static(__dirname + '/public'));

//독점적으로 url을 사용할수 있게 설정
app.use(routes.home,globalRouter); // index 경로
app.use(routes.users,userRouter); // user 경로에 userRouter 적용
app.use(routes.videos,videoRouter);// video 경로에 videoRouter 적용

export default app;
