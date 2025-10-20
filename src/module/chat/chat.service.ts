
// import { ChatRepository } from "../../DB/model/chat/chat.repository";


// class ChatService{
//     private readonly chatRepository = new ChatRepository();

//   getChat =async (req:Request , res:Response)=>{

//     const {userId} = req.params;
//      const userLoginId = req.user._id;
//     const chat =    await this.chatRepository.getOne({
//         users:{$all:{userId , userLoginId}}
//      });
//      return res.json({message:"done",success:true , data:chat})


//   }


// }


// export default new ChatService()






import { Request, Response } from "express";

 import { ChatRepository } from "../../DB/model/chat/chat.repository";


class ChatService {
  private readonly chatRepository = new ChatRepository();

  // عرّف نوع مخصص للـ Request هنا
  getChat = async ( req: Request & { user?: any; params: { userId?: string } }, res: Response
  ) => {
    const { userId } = req.params;
    const userLoginId = req.user?._id;

    const chat = await this.chatRepository.getOne({
      users: { $all: [userId, userLoginId] },
    });

    return res.json({ message: "done", success: true, data: chat });
  };
}

export default ChatService;




