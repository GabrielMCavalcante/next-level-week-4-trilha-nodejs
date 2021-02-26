import { Router } from "express"
import AnswerController from "../controllers/AnswerController"

const answer = Router()

answer.get("/answers/:value", AnswerController.execute)

export default answer