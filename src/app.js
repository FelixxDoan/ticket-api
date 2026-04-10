import express from 'express'
import cors from 'cors'
import swaggerUi from 'swagger-ui-express'
import morgan from 'morgan'
import swaggerSpec from './docs/swagger.js'

import handleErrorMiddleware from './common/middlewares/handleError.js'
import userRoutes from './modules/users/user.routes.js'
import authRoutes from './modules/auth/auth.routes.js'
import ticketRoutes from './modules/tickets/ticket.routes.js'
import commentRoutes from './modules/comments/comment.routes.js'

const app = express()

app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

app.get('/healthz', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString()
  })
})
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.use("/auth", authRoutes)
app.use('/user', userRoutes)
app.use('/tickets', ticketRoutes)
app.use('/tickets', commentRoutes)

app.use(handleErrorMiddleware)

export default app