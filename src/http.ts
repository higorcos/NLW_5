import express from "express";
import { createServer } from "http"; // vem com o node
import { Server, Socket} from "socket.io"
import "./database"; 
import {routes} from "./routes"
import path from 'path'

const app = express();

app.use(express.static(path.join(__dirname, "..", "public")));
app.set('views', path.join(__dirname, '..', 'public'));
app.engine('html',require('ejs').renderFile);
app.set('views engine', 'html');

app.get('/', (req,res)=>{
    return res.render('html/client.html')
})
app.get('/admin', (req,res)=>{
    return res.render('html/admin.html')
})

const http = createServer(app); //criando protocolo http
const io = new Server(http); //Criando Protocolo ws(webSocket)

io.on('connection', (socket: Socket)=> {
    //console.log("Se conectou", socket.id);
});

app.use(express.json());

app.use(routes);

export { http, io}