import { Request, Response } from "express"
import SurveyUserRepository from "../repositories/SurveyUserRepository"
import { getCustomRepository } from "typeorm"

export default class NpsController {
  static async calculate(req: Request, res: Response) {
    const { survey_id } = req.params

    if (!survey_id) {
      return res.status(400).json({
        status: 400,
        message: "Survey ID required"
      })
    }

    const surveyUserRepository = getCustomRepository(SurveyUserRepository)

    const surveysUsers = await surveyUserRepository.find({ survey_id })

    const numPromoters = surveysUsers
      .filter(su => su.value !== null && su.value > 8).length
    
    const numDetractors = surveysUsers
      .filter(su => su.value !== null && su.value < 7).length
    
    const total = surveysUsers.filter(su => su.value !== null).length

    const nps = (numPromoters - numDetractors) / total * 100

    return res.status(200).json({
      status: 200,
      data: {
        promoters: numPromoters,
        detractors: numDetractors,
        passives: total - numPromoters - numDetractors,
        total,
        nps: parseFloat(nps.toFixed(2))
      }
    })
  }
} 