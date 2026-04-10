const authSchemas = {
  RegisterBody: {
    type: "object",
    required: ["fullName", "email", "password"],
    properties: {
      fullName: {
        type: "string",
        example: "Felix Nguyen",
      },
      email: {
        type: "string",
        format: "email",
        example: "felix@example.com",
      },
      password: {
        type: "string",
        example: "123456",
      },
    },
  },

  LoginBody: {
    type: "object",
    required: ["email", "password"],
    properties: {
      email: {
        type: "string",
        format: "email",
        example: "felix@example.com",
      },
      password: {
        type: "string",
        example: "123456",
      },
    },
  },

  AuthUserProfile: {
    type: "object",
    properties: {
      _id: {
        type: "string",
        example: "67f4c8b0d5d3c92b6f123456",
      },
      fullName: {
        type: "string",
        example: "Felix Nguyen",
      },
      email: {
        type: "string",
        format: "email",
        example: "felix@example.com",
      },
      role: {
        type: "string",
        enum: ["admin", "staff", "customer"],
        example: "customer",
      },
      status: {
        type: "string",
        enum: ["active", "inactive"],
        example: "active",
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

  RegisterResponse: {
    type: "object",
    properties: {
      message: {
        type: "string",
        example: "Register success",
      },
      result: {
        $ref: "#/components/schemas/AuthUserProfile",
      },
    },
  },

  LoginResult: {
    type: "object",
    properties: {
      token: {
        type: "string",
        example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.xxx.yyy",
      },
      payload: {
        $ref: "#/components/schemas/AuthUserProfile",
      },
    },
  },

  LoginResponse: {
    type: "object",
    properties: {
      message: {
        type: "string",
        example: "Login success",
      },
      result: {
        $ref: "#/components/schemas/LoginResult",
      },
    },
  },
};

export default authSchemas;