import { Router } from "express"
import userRoutes from "./user"
import surveyRoutes from "./survey"
import emailRoutes from "./email"
import answerRoutes from "./answer"
import npsRoutes from "./nps"

const routes = Router()

routes.use(userRoutes)
routes.use(surveyRoutes)
routes.use(emailRoutes)
routes.use(answerRoutes)
routes.use(npsRoutes)

export default routes