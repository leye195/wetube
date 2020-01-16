import http from 'http';
import app from './app';
const PORT = 8080;
const handleListening=()=>{
    console.log(`Express Server Listening on: http://localhost:${PORT}`);
}
http.createServer(app.listen(PORT,handleListening));