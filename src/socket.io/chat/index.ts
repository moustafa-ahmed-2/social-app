import { Server, Socket } from "socket.io";
import { MessageRepository } from "../../DB/model/message/message.repository";
import { ChatRepository } from "../../DB/model/chat/chat.repository";
import { ObjectId } from "mongoose";


interface IsendMessage{
    message:string,
    destId:string
}


export  const sendMessage = (socket:Socket , io:Server , connectedUser:Map<string , string>)=>{

    return async  (data:IsendMessage)=>{
     const destSocket = connectedUser.get(data.destId)
    socket.emit("successMessage" ,  data );
     if (!destSocket) {
    socket.emit("errorMessage", { message: "User not online" });
    return;
  }
   const sender = socket.data.user.id
    io.to(destSocket).emit("receiveMessage" , sender )
    const messageRepo = new MessageRepository();
    const createdMessage  =  await  messageRepo.create({content:data.message , sender})

    const chatRepo = new ChatRepository();
   const chat =  await  chatRepo.getOne({users:{$all:[sender , data.destId]}})
 

if (!chat) {
  await chatRepo.create(
    {
      users: [sender, data.destId],
      messages: [createdMessage._id as ObjectId],
    },

  );
} else {
  await chatRepo.update(
    { _id: chat._id },
    {
      $push: { messages: createdMessage._id },
    }
  );
}



}




}