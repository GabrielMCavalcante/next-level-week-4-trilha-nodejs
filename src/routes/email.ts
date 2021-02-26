import SendMailController from "../controllers/SendMailController"
import { Router } from "express"

const email = Router()

email.post("/mail", SendMailController.send)

export default email