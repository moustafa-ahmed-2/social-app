import { Router } from "express";
import commentService from "./comment.service";
import { isAuthenticated } from "../../middleware/auth.middleware";



const router = Router({mergeParams:true});




router.post("{:id}" ,  isAuthenticated()   ,  commentService.create  )
router.get("/:id", isAuthenticated(), commentService.getSpecific);
router.delete("/:id", isAuthenticated(), commentService.deleteComment);





export default router ;
