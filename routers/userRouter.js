import express from 'express';
import routes from '../routes';
import { users, userDetail, editUser, changePassword } from '../controller/userController';
const userRouter = express.Router();
userRouter.get(routes.home,users);
userRouter.get(routes.userDetail,userDetail);
userRouter.get(routes.editProfile,editUser);
userRouter.get(routes.changePassword,changePassword);
export default userRouter;