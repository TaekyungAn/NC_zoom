import http from "http"
import { WebSocketServer } from 'ws';
import express from "express";
import path from "path";
const __dirname = path.resolve();

const app =express();

app.set("view engine", "pug");
app.set("views", __dirname + "/src/views");
app.use("/public", express.static(__dirname +"/src/public"));
app.get("/", (req, res)=>res.render("home"));
app.get("/*", (req, res)=>res.redirect("/"));

const handleListen=()=>console.log(`Litening on http://localhost:3000`);

const server= http.createServer(app); // http 서버

const wss= new WebSocketServer({ server }); // 웹소켓 서버

wss.on("connection", (socket) => {
    console.log("Connected to Browser O"); 
    socket.on("close", ()=> console.log("Disconnected from the Browser X"));
    socket.on("message", message => {
        console.log(message.toString());
    })
    socket.send("hello!!");
})

server.listen(3000, handleListen)