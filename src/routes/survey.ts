import { Router } from "express"
import SurveyController from "../controllers/SurveyController"

const survey = Router()

survey.get("/surveys", SurveyController.index)
survey.post("/surveys", SurveyController.create)

export default survey