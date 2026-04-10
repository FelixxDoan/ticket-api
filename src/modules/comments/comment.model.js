import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
    ticketId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ticket",
        required: true
    },
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    content: {
        type: String,
        required: true
    },
    visibility: {
        type: String,
        enum: ["public", "internal"],
        default: "public"
    }
}, { timestamps: true })

const Comment = mongoose.model("Comment", commentSchema)

export default Comment