

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
            console.log("MSG",msg)
            console.log("MSG TYPE",msg.type);
            if(msg.type === "sender"){
                const roomId = msg.roomId;
                sessions.set(roomId,{sender:ws,receiver:null});
           //     console.log("Session Created");
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
         //           console.log("chcekout!!!!",existingSession)
                    existingSession.receiver.send(JSON.stringify({msg:"Connection Established.",type:"connection-establish"}))
                }

//                console.log("FINAL ",existingSession)

                
            }else if(msg.type === "sender-edit"){
                const getSenderSocket:WebSocket | any = getSessionBySocket(ws);
       //         console.log("GET SOCKET FOR SENDEREDIT",getSocket);
                getSenderSocket?.receiver?.send(JSON.stringify({msg:"senderData",type:"senderData",data:msg.data}));
            }else if(msg.type === "receiver-edit"){
                const getReceiverSocket = getSessionBySocket(ws);
     //           console.log("getreceiver socket",getReceiverSocket)
                getReceiverSocket?.sender?.send(JSON.stringify({msg:"receiverData",type:"receiverData",data:msg.data}));
                // socket events for cursors.
            }else if(msg.type === "cursor-update-sender"){
                const getSenderSocket = getSessionBySocket(ws);
                console.log("Gotten Sender Socket for Cursor Update");
                const {userId,name,color,from,to} = msg;
                console.log("userId",userId)
                console.log("From",from)
                console.log("TO",to)
                console.log("Name",name)
                console.log("Sender Cursor points")
                console.log(msg);
                
                getSenderSocket?.receiver?.send(JSON.stringify({msg:"senderCursor",type:"senderCursor",data:{userId:userId,from:from,to:to,name:name,color:color}}));
            }else if(msg.type === "cursor-update-receiver"){
                const getReceiverSocket = getSessionBySocket(ws);
                console.log("Gotten receiver Socket for Cursor Update");
                console.log("I am receiver cursor stuff.")
                console.log(msg)
                const {userId,name,color,from,to} = msg;
                getReceiverSocket?.sender?.send(JSON.stringify({msg:"receiverCursor",type:"receiverCursor",data:{userId:userId,name:name,from:from,to:to,color:color}}));
            }

        })
    
        ws.send(JSON.stringify({msg:"Websocket Server Up!!"}));
    })
}


function getSessionBySocket(ws:WebSocket){
    console.log(sessions.entries());
    for(const[roomId,session] of sessions.entries()){
        if(session.sender === ws || session.receiver === ws){
 //           console.log("SESSION FOUND OMYA",session)
            return session;
        }
    }
   // console.log("SESSSSSSSION NOT FOUND!")
    return null;
}