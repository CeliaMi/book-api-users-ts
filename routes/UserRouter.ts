import { Router } from "express"
import userController from "../controllers/UserController"
import { loginController, registerController } from "../controllers/AuthController";
import { authMiddleware } from "../middleware/authMiddleware"; 


const userRouter = Router();

userRouter.post("/register", registerController);
userRouter.post("/login", loginController);

userRouter.get("/users", authMiddleware, userController.getUsers);
userRouter.get("/users/:id", userController.getUser);
userRouter.patch("/users/:id", userController.updateUser);
userRouter.delete("/users/:id", userController.deleteUser);

export default userRouter;