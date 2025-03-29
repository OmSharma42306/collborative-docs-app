// import {WebSocket,WebSocketServer} from "ws"

// export function initWs(){
//     const clients:Record<string,WebSocket> = {};
//     const wss = new WebSocketServer({port:8080});
//     console.log("WebSocket Server Started!");
//      // adding one to one connection for socket to communication.
//     wss.on('connection',function connection(ws,req){
//         ws.on('error',console.error);
//         // get the userId from the url
//         const userId:string|any = req.url ? req.url.split('/').pop():null;
//         const roomId:string|any = "";

//         if(!userId){
//             console.log("Invalid UserId");
//             ws.close();
//             return;
//         }

//         clients[userId] = ws;
//         clients[roomId] = ws;
        
//         ws.on('message',function message(data:any,isBinary){
//             const msg = JSON.parse(data);
//             const toUserId = msg.toUserId;
//             const textdata = msg.data;
                
//             if(clients[toUserId]){
//                 clients[toUserId].send(JSON.stringify({receiverData:textdata}));
//             }
//         })
   
//         ws.on("close",function close(){
//             console.log(`${clients[userId]} is Disconnected!`);
//             delete clients[userId];
            
//         })

//         ws.send(JSON.stringify({msg:"Hi!"}));
//     })
// }


// custom logic for easy stuff.

import {WebSocket,WebSocketServer} from "ws"


interface sockets{    
    sender:WebSocket | null;
    receiver:WebSocket | null;
    
}

 
// const sessions = new Map<string,{sender:WebSocket | null,receiver:WebSocket| null}>()
const sessions = new Map<string,sockets>();
export function initWs(){
    const wss = new WebSocketServer({port:8080});
    console.log("WebSocket Server Started!");
     // adding one to one connection for socket to communication.
    wss.on('connection',function connection(ws,req){
        ws.on('error',console.error);
 
        
        ws.on('message',function message(data:any,isBinary){
            const msg = JSON.parse(data);
            if(msg.type === "sender"){
                const roomId = msg.roomId;
                sessions.set(roomId,{sender:ws,receiver:null});
                console.log("Session Created");
                ws.send(JSON.stringify({msg:"Connection Established."}))
            }else if(msg.type === "receiver"){
                const roomId = msg.roomId;
                const existingSession = sessions.get(roomId);
                if(!existingSession){
                    // todo sendign socket message that sender is not been initialized.
                    console.log("Sender is not Ready...")
                }
                if(existingSession){
                    existingSession.receiver = ws;
                    existingSession.receiver.send(JSON.stringify({msg:"Connection Established."}))
                }
                
            }else if(msg.type === "senderEdit"){
                const getSocket:WebSocket | any = getSessionBySocket(ws);
                getSocket?.receiver.send(JSON.stringify({msg:"",data:msg.data}));
            }else if(msg.type === "receiverEdit"){
                const getReceiverSocket = getSessionBySocket(ws);
                getReceiverSocket?.sender?.send(JSON.stringify({msg:""}))
            }

        })
   
       

        ws.send(JSON.stringify({msg:"Hi!"}));
    })
}


function getSessionBySocket(ws:WebSocket){
    for(const[roomId,session] of sessions.entries()){
        if(session.sender === ws || session.receiver === ws){
            return session;
        }
    }
    return null;
}