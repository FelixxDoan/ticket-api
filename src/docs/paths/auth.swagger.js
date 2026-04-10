const authPaths = {
  "/auth/register": {
    post: {
      tags: ["Auth"],
      summary: "Register a new user",
      description: "Tạo tài khoản mới bằng fullName, email và password.",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/RegisterBody",
            },
          },
        },
      },
      responses: {
        200: {
          description: "Register success",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/RegisterResponse",
              },
            },
          },
        },
        400: {
          description: "Missing fields hoặc email đã được sử dụng",
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

  "/auth/login": {
    post: {
      tags: ["Auth"],
      summary: "Login",
      description: "Đăng nhập bằng email và password, trả về JWT token và user payload.",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/LoginBody",
            },
          },
        },
      },
      responses: {
        200: {
          description: "Login success",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/LoginResponse",
              },
            },
          },
        },
        400: {
          description: "Missing fields",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse",
              },
            },
          },
        },
        401: {
          description: "Wrong password",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse",
              },
            },
          },
        },
        404: {
          description: "User not found",
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

export default authPaths;