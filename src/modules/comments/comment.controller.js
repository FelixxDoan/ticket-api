import asyncHandler from './../../common/utils/asyncHandler.js';
import { getCommentService, addCommentService } from './comment.service.js';

export const addCommentController = asyncHandler(async (req, res) => {
    const { id: ticketId } = req.params
    const { _id: authorId, role } = req.user

    const { content } = req.body

    const visibility = req.query.visibility?.trim() || "public";

    const result = await addCommentService({ ticketId, authorId, content, visibility, role })

    res.status(200).json({
        message: "Add comment success",
        result
    })
})

export const getCommentController = asyncHandler(async (req, res) => {
    const { id: ticketId } = req.params
    const { _id: authorId, role } = req.user
    const { page, limit, count } = req.query

    const pageNumber = Number(page) || 1;
    const limitNumber = Number(limit) || 10;
    const skip = (pageNumber - 1) * limitNumber

    let safeCount = count.Number(count) || 0
    if(safeCount !== 0) count = 1

    const visibility = req.query.visibility?.trim() || "public";


    const result = await getCommentService(
        { ticketId, visibility, authorId, role },
        { skip, limitNumber, count}
    )

    res.status(200).json({
        message: "Get comments success",
        result
    })

}) 