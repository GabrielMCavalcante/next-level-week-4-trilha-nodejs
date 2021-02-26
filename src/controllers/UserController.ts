import { Request, Response } from "express"
import { getCustomRepository } from "typeorm"
import * as yup from "yup"
import UserRepository from "../repositories/UserRepository"

export default class UserController {
  static async create(req: Request, res: Response) {
    const { name, email } = req.body
    
    const schema = yup.object().shape({
      name: yup.string().required(),
      email: yup.string().email().required()
    })

    try {
      await schema.validate(req.body)
    } catch(err) {
      return res.status(400).json({
        status: 400,
        message: err.message
      }) 
    }

    const usersRepository = getCustomRepository(UserRepository)

    const userExists = await usersRepository.findOne({ email })
    
    if (userExists) {
      return res.status(400).json({ status: 400, message: "User already exists." })
    }

    const createdUser = usersRepository.create({ name, email })
    
    try {
      await usersRepository.save(createdUser)
      return res.status(201).json({ 
        status: 201, 
        message: "User created successfully." 
      })
    } catch(err) {
      return res.status(500).json({ 
        status: 500, 
        message: err.message 
      })
    }
  }
}