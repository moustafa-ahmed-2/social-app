// import { Router } from "express";
// import { isAuthenticated } from "../../middleware/auth.middleware";
// import chatService from "./chat.service";


// const router = Router();


// const chatService = new ChatService();
// router.get("/:userId", isAuthenticated(), chatService.getChat);


// export default router







import { Router } from "express";
import { isAuthenticated } from "../../middleware/auth.middleware";
import ChatService from "./chat.service";


const router = Router();
const chatService = new ChatService(); 

router.get("/:userId", isAuthenticated(), chatService.getChat); 
export default router;
