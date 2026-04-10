import { createTicketService, detailTicketService, listTicketService, assignTicketService, statusTicketService } from './ticket.service.js';
import asyncHandler from './../../common/utils/asyncHandler.js';
import fields from './../../common/utils/fieldByRole.js';

export const createTicketController = asyncHandler(async (req, res) => {
    const { _id } = req.user

    const { title,
        description,
        category,
        priority } = req.body

    const result = await createTicketService({
        title,
        description,
        category,
        priority
    }, _id)

    res.status(200).json({
        message: "Create ticket success",
        result
    })
})

export const detailTicketController = asyncHandler(async (req, res) => {
    const { id } = req.params
    const createdBy = req.user._id

    const result = await detailTicketService(id, createdBy)

    res.status(200).json({
        message: "Get ticket detail success",
        result
    })
})

export const listTicketController = asyncHandler(async (req, res) => {
    const { role, _id } = req.user
    const field = fields[role]
    let option = field(_id)

    const { page, limit, status, category, priority, count } = req.query
    const pageNumber = Number(page) || 1;
    const limitNumber = Number(limit) || 10;
    let safeCount = Number(count) || 0

    if(safeCount !== 0) safeCount = 1
    const skip = (pageNumber - 1) * limitNumber;

    if (status) option.status = status
    if (category) option.category = category
    if (priority) option.priority = priority

    const result = await listTicketService(option, { limit: limitNumber, skip, safeCount })

    res.status(200).json({
        message: "Get all tickets success",
        result
    })
})

export const assignTicketController = asyncHandler(async (req, res) => {
    const { staffId } = req.body
    const { id } = req.params

    const result = await assignTicketService({ staffId, id })

    res.status(200).json({
        message: 'Assign ticket success',
        result
    })
})

export const statusTicketController = asyncHandler(async (req, res) => {
    const { id: ticketId } = req.params
    const { _id: roleId, role } = req.user
    const { status } = req.body
    let option = {
        _id: ticketId, assignedTo: roleId, status
    }

   if(role === 'admin') delete option.assignedTo


    const result = await statusTicketService(option)

    res.status(200).json({
        message: "Change status success",
        result
    })
})