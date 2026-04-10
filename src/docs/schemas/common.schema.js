const commonSchemas = {
  ErrorResponse: {
    type: "object",
    properties: {
      requestId: {
        type: "string",
        example: "req_123456",
      },
      errCode: {
        type: "string",
        example: "VALIDATION_ERROR",
      },
      message: {
        type: "string",
        example: "Missing fields",
      },
      ok: {
        type: "boolean",
        example: false,
      },
    },
  },
};

export default commonSchemas;