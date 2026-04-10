import request from 'supertest'
import { describe, it, expect, beforeAll } from 'vitest'
import app from '../src/app.js'

describe('Ticket API', () => {
  let token = ''
  const password = '123456'
  let email = ''

  beforeAll(async () => {
    email = `customer${Date.now()}@example.com`

    const registerResponse = await request(app)
      .post('/auth/register')
      .send({
        fullName: 'Ticket Customer',
        email,
        password
      })

    expect(registerResponse.status).toBe(200)

    const loginResponse = await request(app)
      .post('/auth/login')
      .send({
        email,
        password
      })

    expect(loginResponse.status).toBe(200)
    token = loginResponse.body.result.token
    expect(token).toBeTruthy()
  })

  it('should reject create ticket when no token is provided', async () => {
    const response = await request(app)
      .post('/tickets/create')
      .send({
        title: 'Unauthorized ticket',
        description: 'This should fail',
        category: 'general',
        priority: 'medium'
      })

    expect(response.status).toBe(401)
    expect(response.body.ok).toBe(false)
    expect(response.body.errCode).toBe('UNAUTHORIZED')
    expect(response.body.message).toBe('Missing token')
  })

  it('should create ticket successfully', async () => {
    const response = await request(app)
      .post('/tickets/create')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Cannot login to dashboard',
        description: 'I cannot access my account after resetting password',
        category: 'technical',
        priority: 'medium'
      })

    expect(response.status).toBe(200)
    expect(response.body.message).toBe('Create ticket success')
    expect(response.body.result).toBeTruthy()
    expect(response.body.result.title).toBe('Cannot login to dashboard')
    expect(response.body.result.category).toBe('technical')
    expect(response.body.result.priority).toBe('medium')
    expect(response.body.result.status).toBe('open')
    expect(response.body.result.code).toBeTruthy()
  })
})