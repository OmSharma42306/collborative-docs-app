

import {WebSocket,WebSocketServer} from "ws"


interface sockets{    
    sender:WebSocket | null;
    receiver:WebSocket | null;
    
}

 
// const sessions = new Map<string,{sender:WebSocket | null,receiver:WebSocket| null}>()
const sessions = new Map<any,sockets>();
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
                //console.log("ROOOOOOOOO",roomId)
                const existingSession = sessions.get(roomId);
                //console.log("Existing Session: ",existingSession)
                // console.log("Sessions: ",sessions);
                if(!existingSession){
                    // todo sendign socket message that sender is not been initialized.
                    console.log("Sender is not Ready...")
                }
                if(existingSession){
                    existingSession.receiver = ws;
                    existingSession.receiver.send(JSON.stringify({msg:"Connection Established."}))
                }

                console.log("FINAL ",existingSession)

                
            }else if(msg.type === "senderEdit"){
                const getSocket:WebSocket | any = getSessionBySocket(ws);
                console.log("GET SOCKET FOR SENDEREDIT",getSocket);
                getSocket?.receiver.send(JSON.stringify({msg:"senderData",data:msg.data}));
            }else if(msg.type === "receiverEdit"){
                const getReceiverSocket = getSessionBySocket(ws);
                console.log("getreceiver socket",getReceiverSocket)
                getReceiverSocket?.sender?.send(JSON.stringify({msg:"receiverData",data:msg.data}));
            }

        })
   
       

        ws.send(JSON.stringify({msg:"Websocket Server Up!!"}));
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