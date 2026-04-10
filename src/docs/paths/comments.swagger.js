const commentPaths = {
  "/tickets/{id}/comments": {
    get: {
      tags: ["Comments"],
      summary: "Get comments by ticket",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: {
            type: "string",
            example: "67f4c8b0d5d3c92b6f654321",
          },
        },
        {
          name: "visibility",
          in: "query",
          schema: {
            type: "string",
            enum: ["public", "internal"],
            example: "public",
            default: "public",
          },
        },
        {
          name: "page",
          in: "query",
          schema: {
            type: "integer",
            example: 1,
          },
        },
        {
          name: "limit",
          in: "query",
          schema: {
            type: "integer",
            example: 10,
          },
        },
        {
          name: "count",
          in: "query",
          schema: {
            type: "integer",
            enum: [0, 1],
            example: 1,
          },
        },
      ],
      responses: {
        200: {
          description: "Get comments success",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/CommentListResponse",
              },
            },
          },
        },
        400: {
          description: "Missing field or visibility invalid",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse",
              },
            },
          },
        },
        401: {
          description: "Missing token or invalid token",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse",
              },
            },
          },
        },
        403: {
          description: "Not relate with ticket or role cannot set internal visibility",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse",
              },
            },
          },
        },
        404: {
          description: "Ticket not exist",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse",
              },
            },
          },
        },
        500: {
          description: "Unexpected server error",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse",
              },
            },
          },
        },
      },
    },

    post: {
      tags: ["Comments"],
      summary: "Add comment to ticket",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: {
            type: "string",
            example: "67f4c8b0d5d3c92b6f654321",
          },
        },
        {
          name: "visibility",
          in: "query",
          schema: {
            type: "string",
            enum: ["public", "internal"],
            example: "public",
            default: "public",
          },
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/AddCommentBody",
            },
          },
        },
      },
      responses: {
        200: {
          description: "Add comment success",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/AddCommentResponse",
              },
            },
          },
        },
        400: {
          description: "Missing fields or visibility invalid",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse",
              },
            },
          },
        },
        401: {
          description: "Missing token or invalid token",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse",
              },
            },
          },
        },
        403: {
          description: "Not relate with ticket or role cannot set internal visibility",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse",
              },
            },
          },
        },
        404: {
          description: "Ticket not exist",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse",
              },
            },
          },
        },
        500: {
          description: "Unexpected server error",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse",
              },
            },
          },
        },
      },
    },
  },
};

export default commentPaths;