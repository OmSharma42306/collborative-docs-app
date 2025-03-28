import express, { json } from  "express" 
import {WebSocket,WebSocketServer} from "ws"


export function initWs(){
    const clients:Record<string,WebSocket> = {};
    const wss = new WebSocketServer({port:8080});
    
     // adding one to one connection for socket to communication.
    wss.on('connection',function connection(ws,req){
        ws.on('error',console.error);
        // get the userId from the url
        const userId:string|any = req.url ? req.url.split('/').pop():null;
        console.log(req.url);
        console.log(userId)
        if(!userId){
            console.log("Invalid UserId");
            ws.close();
            return;
        }
        clients[userId] = ws;
        
        ws.on('message',function message(data:any,isBinary){
            const msg = JSON.parse(data);
            const toUserId = msg.toUserId;
            if(clients[toUserId]){
                clients[toUserId].send(JSON.stringify({msg:"hi"}));
            }
        })
        console.log(clients);
    
        

        
        ws.on("close",function close(){
            console.log(`${clients[userId]} is Disconnected!`);
            delete clients[userId];
            
        })

        ws.send(JSON.stringify({msg:"Hi!"}));
    })
}


