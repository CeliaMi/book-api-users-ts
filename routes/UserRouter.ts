import { Router } from "express"
import userController from "../controllers/UserController"
import { loginController, registerController } from "../controllers/AuthController";
import { authMiddleware } from "../middleware/authMiddleware"; 


const userRouter = Router();

userRouter.get("/users", authMiddleware, userController.getUsers);
userRouter.get("/users/:id", userController.getUser);
userRouter.post("/register", registerController);
userRouter.post("/login", loginController);
userRouter.put("/users/:id", userController.updateUser);
userRouter.delete("/users/:id", userController.deleteUser);

export default userRouter;