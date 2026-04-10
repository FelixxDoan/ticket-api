const userPaths = {
  "/user/me": {
    get: {
      tags: ["Users"],
      summary: "Get current user profile",
      security: [{ bearerAuth: [] }],
      responses: {
        200: {
          description: "Get profile success",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ProfileResponse",
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
          description: "User not exist",
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

export default userPaths;