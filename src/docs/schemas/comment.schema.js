const commentSchemas = {
  Comment: {
    type: "object",
    properties: {
      _id: {
        type: "string",
        example: "67f4c8b0d5d3c92b6f777777",
      },
      ticketId: {
        type: "string",
        example: "67f4c8b0d5d3c92b6f654321",
      },
      authorId: {
        type: "string",
        example: "67f4c8b0d5d3c92b6f123456",
      },
      content: {
        type: "string",
        example: "We are checking this issue.",
      },
      visibility: {
        type: "string",
        enum: ["public", "internal"],
        example: "public",
      },
      createdAt: {
        type: "string",
        format: "date-time",
        example: "2026-04-09T10:00:00.000Z",
      },
      updatedAt: {
        type: "string",
        format: "date-time",
        example: "2026-04-09T10:05:00.000Z",
      },
    },
  },

  AddCommentBody: {
    type: "object",
    required: ["content"],
    properties: {
      content: {
        type: "string",
        example: "We are checking this issue.",
      },
    },
  },

  AddCommentResponse: {
    type: "object",
    properties: {
      message: {
        type: "string",
        example: "Add comment success",
      },
      result: {
        $ref: "#/components/schemas/Comment",
      },
    },
  },

  CommentListOnlyResult: {
    type: "array",
    items: {
      $ref: "#/components/schemas/Comment",
    },
  },

  CommentListWithTotalResult: {
    type: "object",
    properties: {
      total: {
        type: "integer",
        example: 12,
      },
      lstComment: {
        type: "array",
        items: {
          $ref: "#/components/schemas/Comment",
        },
      },
    },
  },

  CommentListResult: {
    oneOf: [
      { $ref: "#/components/schemas/CommentListOnlyResult" },
      { $ref: "#/components/schemas/CommentListWithTotalResult" },
    ],
  },

  CommentListResponse: {
    type: "object",
    properties: {
      message: {
        type: "string",
        example: "Get comments success",
      },
      result: {
        $ref: "#/components/schemas/CommentListResult",
      },
    },
  },
};

export default commentSchemas;