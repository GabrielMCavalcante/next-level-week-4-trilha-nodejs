import nodemailer from "nodemailer"
import { Response } from "express"
import handlebars from "handlebars"
import fs from "fs"
import Survey from "../models/Survey"
import User from "../models/User"
import Mail from "nodemailer/lib/mailer"

class SendMailService {
  private transporter: nodemailer.Transporter;
  private response: Response;

  getTransporter = () => this.transporter

  build = async (res: Response) => {
    this.response = res

    try {
      const account = await nodemailer.createTestAccount()
      
      this.transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        auth: {
            user: account.user,
            pass: account.pass
        }
    })
    } catch(err) {
      return res.status(500).json({
        status: 500,
        pos: 1,
        message: err.message
      })
    }
  }

  send = async (npsPath: string, contextValues: Object, message: Mail.Options) => {
    const templateFileContent = fs.readFileSync(npsPath).toString("utf-8")
    const mailTemplateParse = handlebars.compile(templateFileContent)
    const html = mailTemplateParse(contextValues)

    message.html = html

    try {
      this.transporter.sendMail(message, (err, info) => {
        if (err) {
          return this.response.status(500).json({
            status: 500,
            message: err.message
          })
        }
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
      
        return this.response.status(200).json({
          status: 200,
          message: "Email sent successfully"
        })
      })
    } catch(err) {
      return this.response.status(500).json({
        status: 500,
        pos: 2,
        message: err.message
      })
    }
  }
}

export default new SendMailService()