import express from "express";
import {WebSocketServer,WebSocket} from "ws";


const wss = new WebSocketServer({port:8080});

let senderWs:null | WebSocket = null;
let receiverWs:null | WebSocket = null;

wss.on('connection',function connection(ws){
    const roomId = "123";
    if (!ws){
        console.error("Websocket connection Error");
    }

    ws.on('message',function message(data:any,isBinary){
        
        const msg = JSON.parse(data);
        console.log(msg.roomIdofclient)
        console.log(msg.clientType)
        console.log(msg.roomIdofclient === roomId)
        if(msg.roomIdofclient === roomId && msg.clientType === "sender"){
            console.log("i am in sender!")
            senderWs = ws;
            console.log("i am in sender!")
            senderWs.send("I am from sender");    
        } 

        if(msg.roomIdofclient === roomId && msg.clientType === "receiver"){
            console.log("i am in receiver!")
            receiverWs = ws;
            console.log("i am in receiver!")
            receiverWs.send("i am receiver socket.")

        }        
        
        if(senderWs){
            senderWs.on('message',function message(data:any,isBinary){
                const msg = JSON.parse(data);
                console.log(msg)
                if(msg.type === "changeText"){
                    receiverWs?.send("xyz")
                }
            })
        }

        if(receiverWs){
            receiverWs.on('message',function message(data:any,isBinary){
                const msg = JSON.parse(data);
                console.log(msg)
                if(msg.type === "xyz"){
                    senderWs?.send("HIIIIIIIIIIIII");
                }
            })
        }
        ws.send("connected!");    
    })

    console.log(senderWs)
    console.log(receiverWs)
        
    if(senderWs){
        senderWs.on('message',function message(data:any,isBinary){
            const msg = JSON.parse(data);
            receiverWs?.send(JSON.stringify({msg:"changeText",data}));
        })}
    
    if(receiverWs){
        receiverWs.on('message',function message(data:any,isBinary){
            const msg = JSON.parse(data);
            if(msg.xyz === "send"){
                senderWs?.send(JSON.stringify({msg:"changeText",data}));    
            }
            senderWs?.send(JSON.stringify({msg:"changeText",data}));
        })
    }
    

 


})



