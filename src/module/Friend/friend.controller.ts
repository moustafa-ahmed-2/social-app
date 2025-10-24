

import { Router } from "express";
import { isValid } from "../../middleware/validation.middleware";
import friendService from "./friend.service";
import * as validation from "./validation";
import { isAuthenticated } from "../../middleware/auth.middleware";



const router = Router();
router.use(isAuthenticated());

router.get("/", friendService.getFriends);

router.post("/block-user", isValid(validation.blockUserValidation), friendService.blockUser);

router.post("/add-friend", isValid(validation.friendIDValidation), friendService.addFriend);

router.post("/remove-friend", isValid(validation.friendIDValidation), friendService.removeFriend);

router.patch(
  "/cancel-friend-request",
  isValid(validation.friendIDValidation),
  friendService.cancelFriendRequest
);

router.patch(
  "/send-friend-request",
  isValid(validation.friendIDValidation),
  friendService.sendFriendRequest
);

router.post(
  "/accept-friend-request",
  isValid(validation.friendIDValidation),
  friendService.acceptFriendRequest
);

export default router;