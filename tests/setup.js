import mongoose from 'mongoose'
import { beforeAll, afterAll, afterEach } from 'vitest'
import config from '../src/config/env.js'

const { MONGODB_URI } = config()

beforeAll(async () => {
  await mongoose.connect(MONGODB_URI)
}, 20000)

afterEach(() => {
  // để trống trước
})

afterAll(async () => {
  await mongoose.connection.close()
})