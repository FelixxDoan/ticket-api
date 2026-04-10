const userSchemas = {
  UserProfile: {
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

  ProfileResponse: {
    type: "object",
    properties: {
      message: {
        type: "string",
        example: "Get profile success",
      },
      result: {
        $ref: "#/components/schemas/UserProfile",
      },
    },
  },
};

export default userSchemas;