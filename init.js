import http from 'http';
import dotenv from 'dotenv';
import './db';
import app from './app';
dotenv.config();
import "./models/video";
import "./models/comment";
const PORT = process.env.PORT || 8080;
const handleListening=()=>{
    console.log(`Express Server Listening on: http://localhost:${PORT}`);
}
http.createServer(app.listen(PORT,handleListening));