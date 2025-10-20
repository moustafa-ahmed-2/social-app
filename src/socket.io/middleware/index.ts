import { Socket } from "socket.io";
import { UserRepository } from "../../DB/model/user/user.repository";
import { NotFoundException } from "../../utils/error";
import { verifyToken } from "../../utils/token";

export const socketAuh = async  (socket:Socket ,  next:Function) => {

try {
    
const {authorization} = socket.handshake.auth;
  const payload  =  verifyToken(authorization);
  const userRepository = new UserRepository();
 const user =    await userRepository.getOne({_id:payload._id});
 
 if(!user) throw new NotFoundException("user not found")
    socket.data.user = user
    next()

} catch (error) {

    next(error)
}



}
