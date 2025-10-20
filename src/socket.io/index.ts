import { Server, Socket } from "socket.io"

import { Server as httpServer }    from "node:http"
import { socketAuh } from "./middleware"
import { sendMessage } from "./chat"

const connectedUser = new Map<string , string > () 


export const initSocket = (server:httpServer) => {

   const io = new Server(server , {cors: {
  origin:"*"
}}  )

io.use( socketAuh);
io.on("connection" , (socket:Socket)=> {
    connectedUser.set(socket.data.user.id , socket.id )
console.log("new user connected");

socket.on("sendMessage" , sendMessage(socket , io , connectedUser))

}   )

}



