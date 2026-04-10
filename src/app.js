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
import User from './modules/users/user.model.js'
import Ticket from './modules/tickets/ticket.model.js'
import Comment from './modules/comments/comment.model.js'

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

app.post('/admin/add', async (req, res, next) => {
    const { fullName, email, password, role } = req.body
    try {
        const user = await User.create({ fullName, email, password, role })

        res.status(200).json({ message: "Crate user success", user })
    } catch (error) {
        console.log(error)
        return next(error)
    }

})

app.get('/admin/user/all', async (req, res, next) => {
    
    try {
        const user = await User.find()

        res.status(200).json({ message: "Get user success", user })
    } catch (error) {
        console.log(error)
        return next(error)
    }

})

app.get('/admin/tickets/all', async (req, res, next) => {
    
    try {
        const lstTicket = await Ticket.find()

        res.status(200).json({ message: "Get ticket success", lstTicket })
    } catch (error) {
        console.log(error)
        return next(error)
    }
})

app.get('/admin/tickets/:id/comment', async (req, res, next) => {
    const {id} = req.params
    try {
        const lstTicket = await Comment.findById(id)

        res.status(200).json({ message: "Get ticket success", lstTicket })
    } catch (error) {
        console.log(error)
        return next(error)
    }
})

app.get('/admin/tickets/comment/all', async (req, res, next) => {
    try {
        const lstTicket = await Comment.find()

        res.status(200).json({ message: "Get ticket success", lstTicket })
    } catch (error) {
        console.log(error)
        return next(error)
    }
})

app.delete('/admin/tickets/all', async (req, res, next) => {
    
    try {
        const lstTicket = await Ticket.deleteMany({});

        res.status(200).json({ message: "del ticket success", lstTicket })
    } catch (error) {
        console.log(error)
        return next(error)
    }
})

app.use("/auth", authRoutes)
app.use('/user', userRoutes)
app.use('/tickets', ticketRoutes)
app.use('/tickets', commentRoutes)

app.use(handleErrorMiddleware)

export default app