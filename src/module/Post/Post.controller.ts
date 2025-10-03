import { Router } from "express";
import { isAuthenticated } from "../../middleware/auth.middleware";
import PostService from "./Post.service";
import commentRouter  from "../Comment/comment.controller";


 const router =  Router()


router.use("/:postId/comment" ,  commentRouter  )
 router.post("/" , isAuthenticated()   ,    PostService.create   )
 router.patch("/:id" , isAuthenticated()   ,    PostService.addReaction   )
router.get("/:id" , PostService.getSpecific)
router.delete("/:id" , isAuthenticated()  ,  PostService.deletePost )



export default router
