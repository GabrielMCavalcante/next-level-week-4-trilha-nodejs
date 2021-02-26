import { Router } from "express"
import NpsController from "../controllers/NpsController"

const nps = Router()

nps.get("/nps/:survey_id", NpsController.calculate)

export default nps