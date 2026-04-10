import request from 'supertest'
import { describe, it, expect } from 'vitest'
import app from '../src/app.js'

describe('Auth API', () => {
  it('should register and login successfully', async () => {
    const email = `test${Date.now()}@example.com`
    const password = '123456'

    const registerResponse = await request(app)
      .post('/auth/register')
      .send({
        fullName: 'Test User',
        email,
        password
      })

    expect(registerResponse.status).toBe(200)
    expect(registerResponse.body.message).toBe('Register success')
    expect(registerResponse.body.result).toBeTruthy()
    expect(registerResponse.body.result.email).toBe(email)

    const loginResponse = await request(app)
      .post('/auth/login')
      .send({
        email,
        password
      })

    expect(loginResponse.status).toBe(200)
    expect(loginResponse.body.message).toBe('Login success')
    expect(loginResponse.body.result.token).toBeTruthy()
    expect(loginResponse.body.result.payload.email).toBe(email)
  })
})