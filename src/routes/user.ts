import { Router } from "express"
import UserController from "../controllers/UserController"

const user = Router()

user.post("/users", UserController.create)

export default user