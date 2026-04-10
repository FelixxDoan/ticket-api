
import { checkBelongTicket, checkExistTicket } from '../tickets/ticket.service.js';
import throwError from './../../common/utils/throwError.js';
import Comment from './comment.model.js';

const visibilityArr = ["public", "internal"]

export const addCommentService = async ({ ticketId, authorId, content, visibility, role }) => {

    if (!ticketId || !authorId || !content) throwError(400, "Missing fields")

    if (!visibilityArr.includes(visibility)) throwError(400, "Visibility invalid")

    if (!await checkExistTicket(ticketId)) throwError(404, "Ticket not exist")

    if (!await checkBelongTicket(ticketId, { id: authorId, role })) throwError(403, "Not relate with ticket")

    if (role === "customer" && visibility === "internal") throwError(403, "Role cannot set")

    return await Comment.create({ ticketId, authorId, content, visibility })
}

export const getCommentService = async ({ ticketId, visibility, authorId, role }, { skip, limitNumber, count }) => {
    if (!ticketId) throwError(400, "Missing field")

    if (!visibilityArr.includes(visibility)) throwError(400, "Visibility invalid")

    if (!await checkExistTicket(ticketId)) throwError(404, "Ticket not exist")

    if (!await checkBelongTicket(ticketId, { id: authorId, role })) throwError(403, "Not relate with ticket")

    if (role === "customer" && visibility === "internal") throwError(403, "Role cannot set")

    if (count === 1) {
        const [lstComment, total] = await Promise.all([
            Comment.find({ ticketId, visibility })
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limitNumber),

            Comment.countDocuments({ ticketId, visibility })

        ])

        return { total, lstComment }
    }

    return await Comment.find({ ticketId, visibility })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNumber)

}