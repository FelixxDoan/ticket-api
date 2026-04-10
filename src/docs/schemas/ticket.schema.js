const ticketSchemas = {
  Ticket: {
    type: "object",
    properties: {
      _id: {
        type: "string",
        example: "67f4c8b0d5d3c92b6f654321",
      },
      code: {
        type: "string",
        example: "TEC_1712645566778_ab12cd",
      },
      title: {
        type: "string",
        example: "Cannot login to account",
      },
      description: {
        type: "string",
        example: "I cannot login after resetting my password.",
      },
      category: {
        type: "string",
        enum: ["account", "billing", "technical", "general"],
        example: "technical",
      },
      priority: {
        type: "string",
        enum: ["low", "medium", "high"],
        example: "high",
      },
      status: {
        type: "string",
        enum: ["open", "assigned", "in_progress", "resolved", "closed", "cancelled"],
        example: "open",
      },
      createdBy: {
        type: "string",
        example: "67f4c8b0d5d3c92b6f123456",
      },
      assignedTo: {
        oneOf: [
          { type: "string", example: "67f4c8b0d5d3c92b6f999999" },
          { type: "null", example: null },
        ],
      },
      createdAt: {
        type: "string",
        format: "date-time",
        example: "2026-04-09T10:00:00.000Z",
      },
      updatedAt: {
        type: "string",
        format: "date-time",
        example: "2026-04-09T10:00:00.000Z",
      },
    },
  },

  CreateTicketBody: {
    type: "object",
    required: ["title", "description", "priority"],
    properties: {
      title: {
        type: "string",
        example: "Cannot login to account",
      },
      description: {
        type: "string",
        example: "I cannot login after resetting my password.",
      },
      category: {
        type: "string",
        enum: ["account", "billing", "technical", "general"],
        example: "technical",
      },
      priority: {
        type: "string",
        enum: ["low", "medium", "high"],
        example: "high",
      },
    },
  },

  AssignTicketBody: {
    type: "object",
    required: ["staffId"],
    properties: {
      staffId: {
        type: "string",
        example: "67f4c8b0d5d3c92b6f999999",
      },
    },
  },

  ChangeTicketStatusBody: {
    type: "object",
    required: ["status"],
    properties: {
      status: {
        type: "string",
        enum: ["open", "assigned", "in_progress", "resolved", "closed", "cancelled"],
        example: "in_progress",
      },
    },
  },

  CreateTicketResponse: {
    type: "object",
    properties: {
      message: {
        type: "string",
        example: "Create ticket success",
      },
      result: {
        $ref: "#/components/schemas/Ticket",
      },
    },
  },

  TicketDetailResponse: {
    type: "object",
    properties: {
      message: {
        type: "string",
        example: "Get ticket detail success",
      },
      result: {
        $ref: "#/components/schemas/Ticket",
      },
    },
  },

  TicketListOnlyResult: {
    type: "array",
    items: {
      $ref: "#/components/schemas/Ticket",
    },
  },

  TicketListWithTotalResult: {
    type: "object",
    properties: {
      total: {
        type: "integer",
        example: 25,
      },
      lstTicket: {
        type: "array",
        items: {
          $ref: "#/components/schemas/Ticket",
        },
      },
    },
  },

  TicketListResult: {
    oneOf: [
      { $ref: "#/components/schemas/TicketListOnlyResult" },
      { $ref: "#/components/schemas/TicketListWithTotalResult" },
    ],
  },

  TicketListResponse: {
    type: "object",
    properties: {
      message: {
        type: "string",
        example: "Get all tickets success",
      },
      result: {
        $ref: "#/components/schemas/TicketListResult",
      },
    },
  },

  AssignTicketResult: {
    type: "object",
    properties: {
      assignedTo: {
        type: "string",
        example: "67f4c8b0d5d3c92b6f999999",
      },
      status: {
        type: "string",
        enum: ["assigned"],
        example: "assigned",
      },
    },
  },

  AssignTicketResponse: {
    type: "object",
    properties: {
      message: {
        type: "string",
        example: "Assign ticket success",
      },
      result: {
        $ref: "#/components/schemas/AssignTicketResult",
      },
    },
  },

  ChangeTicketStatusResult: {
    type: "object",
    properties: {
      status: {
        type: "string",
        enum: ["open", "assigned", "in_progress", "resolved", "closed", "cancelled"],
        example: "resolved",
      },
    },
  },

  ChangeTicketStatusResponse: {
    type: "object",
    properties: {
      message: {
        type: "string",
        example: "Change status success",
      },
      result: {
        $ref: "#/components/schemas/ChangeTicketStatusResult",
      },
    },
  },
};

export default ticketSchemas;