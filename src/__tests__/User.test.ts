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

  it("should create a new user", async () => {
    const response = await request(app)
      .post("/users")
      .send({
        name: "User name",
        email: "user@example.com"
      })

    expect(response.status).toBe(201)
  })

  it("should not create an existing user again", async () => {
    const response = await request(app)
      .post("/users")
      .send({
        name: "User name",
        email: "user@example.com"
      })

    expect(response.status).toBe(400)
  })
})