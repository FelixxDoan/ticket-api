import {Router} from 'express'
import authenticate from '../../common/middlewares/authenticate.js'
import { getCommentController, addCommentController } from './comment.controller.js'

const r = Router()

r.get('/:id/comments', authenticate, getCommentController)
r.post('/:id/comments',authenticate, addCommentController)

export default r