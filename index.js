const http=require("http");
const express=require("express");
const app=express();

const port = 8080;
http.createServer(app.listen(port),()=>{
    console.log(`Express Server PORT:${port}`);
})