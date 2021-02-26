import { Request, Response } from "express"
import { getCustomRepository } from "typeorm"
import SurveyRepository from "../repositories/SurveyRepository"

export default class SurveyController {
  static async index(req: Request, res: Response) {
    const surveyRepository = getCustomRepository(SurveyRepository)
    
    try { 
      const surveyList = await surveyRepository.find()

      return res.status(200).json({
        status: 200,
        data: surveyList
      })
    } catch (err) {
      return res.status(500).json({
        status: 500,
        message: err.message
      })
    }
  }

  static async create(req: Request, res: Response) {
    const { title, description } = req.body

    if (!title || !description) {
      return res.status(400).json({
        status: 400,
        message: "Title and description required"
      })
    }

    const surveyRepository = getCustomRepository(SurveyRepository)
    const surveyExists = await surveyRepository.findOne({ title, description })
    if (surveyExists) {
      return res.status(400).json({
        status: 400,
        message: "Survey already exists"
      })
    }
    
    try {
      const newSurvey = surveyRepository.create({ title, description })
      await surveyRepository.save(newSurvey)

      return res.status(201).json({
        status: 201,
        message: "Survey created successfully"
      })
    } catch (err) {
      return res.status(500).json({
        status: 500,
        message: err.message
      })
    }
  }

  static async update(req: Request, res: Response) {

  }

  static async delete(req: Request, res: Response) {

  }
}