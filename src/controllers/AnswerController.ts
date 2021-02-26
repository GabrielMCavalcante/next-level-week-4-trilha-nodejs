import { Request, Response } from "express"
import { getCustomRepository } from "typeorm"
import SurveyUserRepository from "../repositories/SurveyUserRepository"

export default class AnswerController {
  static async execute(req: Request, res: Response) {
    const surveyValue = req.params.value as string
    const surveyUserId = req.query.u as string

    if (!surveyValue || !surveyUserId) {
      return res.status(400).json({
        status: 400,
        message: "Survey value and survey-user id are required"
      })
    }

    const surveyUserRepository = getCustomRepository(SurveyUserRepository)

    const surveyUser = await surveyUserRepository.findOne({ id: surveyUserId })

    if (!surveyUser) {
      return res.status(404).json({
        status: 404,
        message: "No survey-user found with given id"
      })
    }
    
    if(isNaN(parseInt(surveyValue))) {
      return res.status(400).json({
        status: 400,
        message: "Survey value must be an integer"
      })
    }

    try {
      await surveyUserRepository.update({ id: surveyUserId }, { value: parseInt(surveyValue) })
      return res.status(200).json({
        status: 200,
        message: "Survey value updated successfully"
      })
    } catch(err) {
      return res.status(500).json({
        status: 500,
        message: err.message
      })
    }
  }
}