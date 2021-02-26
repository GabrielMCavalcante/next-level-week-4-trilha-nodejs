import { getConnection } from "typeorm"
import request from "supertest"
import { app } from "../app"
import createConnection from "../database"

describe("Users", () => {
  beforeAll(async () => {
    const connection = await createConnection()
    await connection.runMigrations()
  }) 

  afterAll(async () => {
    const connection = getConnection()
    await connection.dropDatabase()
    await connection.close()
  })

  it("should create a new survey", async () => {
    const response = await request(app)
      .post("/surveys")
      .send({
        title: "Survey title",
        description: "Survey description"
      })

    expect(response.status).toBe(201)
  })

  it("should not create an existing survey again", async () => {
    const response = await request(app)
      .post("/surveys")
      .send({
        title: "Survey title",
        description: "Survey description"
      })

    expect(response.status).toBe(400)
  })

  it("should list all existing surveys", async () => {
    const response = await request(app)
      .get("/surveys")


    expect(response.status).toBe(200)
    expect(response.body.data[0]).toHaveProperty("id")
  })
})