const ticketPaths = {
  "/tickets/create": {
    post: {
      tags: ["Tickets"],
      summary: "Create ticket",
      description: "Customer only",
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/CreateTicketBody",
            },
          },
        },
      },
      responses: {
        200: {
          description: "Create ticket success",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/CreateTicketResponse",
              },
            },
          },
        },
        400: {
          description: "Missing fields, category invalid, or priority invalid",
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
          description: "Role not match",
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

  "/tickets/all": {
    get: {
      tags: ["Tickets"],
      summary: "List tickets",
      security: [{ bearerAuth: [] }],
      parameters: [
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
        {
          name: "status",
          in: "query",
          schema: {
            type: "string",
            enum: ["open", "assigned", "in_progress", "resolved", "closed", "cancelled"],
            example: "open",
          },
        },
        {
          name: "category",
          in: "query",
          schema: {
            type: "string",
            enum: ["account", "billing", "technical", "general"],
            example: "technical",
          },
        },
        {
          name: "priority",
          in: "query",
          schema: {
            type: "string",
            enum: ["low", "medium", "high"],
            example: "high",
          },
        },
      ],
      responses: {
        200: {
          description: "Get all tickets success",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/TicketListResponse",
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

  "/tickets/{id}": {
    get: {
      tags: ["Tickets"],
      summary: "Get ticket detail",
      description: "Current implementation only returns ticket belonging to createdBy",
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
      ],
      responses: {
        200: {
          description: "Get ticket detail success",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/TicketDetailResponse",
              },
            },
          },
        },
        400: {
          description: "Missing credential",
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

  "/tickets/{id}/assign": {
    patch: {
      tags: ["Tickets"],
      summary: "Assign ticket to staff",
      description: "Admin only",
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
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/AssignTicketBody",
            },
          },
        },
      },
      responses: {
        200: {
          description: "Assign ticket success",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/AssignTicketResponse",
              },
            },
          },
        },
        400: {
          description: "Missing staff id, missing ticket id, or not a staff",
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
          description: "Role not match",
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

  "/tickets/{id}/status": {
    patch: {
      tags: ["Tickets"],
      summary: "Change ticket status",
      description: "Staff or admin only",
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
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/ChangeTicketStatusBody",
            },
          },
        },
      },
      responses: {
        200: {
          description: "Change status success",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ChangeTicketStatusResponse",
              },
            },
          },
        },
        400: {
          description: "Missing id ticket or status invalid",
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
          description: "Role not match",
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

export default ticketPaths;