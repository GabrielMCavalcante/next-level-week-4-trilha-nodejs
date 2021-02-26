import { Request, Response } from "express"
import path from "path" 
import SendMailService from "../services/SendMailService"
import { getCustomRepository } from "typeorm"
import SurveyRepository from "../repositories/SurveyRepository"
import SurveyUserRepository from "../repositories/SurveyUserRepository"
import UserRepository from "../repositories/UserRepository"

export default class SendMailController {
  static async send(req: Request, res: Response) {
    const { survey_id, email } = req.body

    if (!email || !survey_id) {
      return res.status(400).json({
        status: 400,
        message: "Survey ID and user email are required"
      })
    }

    const userRepository = getCustomRepository(UserRepository)

    const user = await userRepository.findOne({ email })

    if (!user) {
      return res.status(404).json({
        status: 404,
        message: "No user found with given email"
      })
    }

    const user_id = user.id

    const surveyRepository = getCustomRepository(SurveyRepository)

    const survey = await surveyRepository.findOne({ id: survey_id })

    if (!survey) {
      return res.status(404).json({
        status: 404,
        message: "No survey found with given id"
      })
    }

    const surveyUserRepository = getCustomRepository(SurveyUserRepository)

    try {
      const surveyUser = await surveyUserRepository.findOne({ survey_id, user_id })
      
      const contextValues = {
        name: user.name,
        title: survey.title,
        description: survey.description,
        link: "http://localhost:3333",
        survey_user_id: ""
      }

      if (!surveyUser) {
        const createdSurveyUser = surveyUserRepository.create({ survey_id, user_id })
        await surveyUserRepository.save(createdSurveyUser)
        contextValues.survey_user_id = createdSurveyUser.id
      } else {
        contextValues.survey_user_id = surveyUser!.id
      }

      const emailService = SendMailService

      if (!emailService.getTransporter()) {
        const response = await emailService.build(res)
        
        if (response?.statusCode === 500) {
          return response
        }
      }

      const npsPath = path.resolve(__dirname, "..", "views", "emails", "npsMail.hbs")

      const message = {
        to: user.email,
        from: "NPS <noreply@nps.com.br>",
        subject: survey.title,
        text: survey.description
      }

      return await emailService.send(npsPath, contextValues, message)

    } catch(err) {
      return res.status(500).json({
        status: 500,
        pos: 3,
        message: err.message
      })
    }
  }
}