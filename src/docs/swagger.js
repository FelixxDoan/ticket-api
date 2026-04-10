import authPaths from "./paths/auth.swagger.js";
import userPaths from "./paths/users.swagger.js";
import ticketPaths from "./paths/tickets.swagger.js";
import commentPaths from "./paths/comments.swagger.js";

import commonSchemas from "./schemas/common.schema.js";
import authSchemas from "./schemas/auth.schema.js";
import userSchemas from "./schemas/user.schema.js";
import ticketSchemas from "./schemas/ticket.schema.js";
import commentSchemas from "./schemas/comment.schema.js";

const swaggerSpec = {
  openapi: "3.0.0",
  info: {
    title: "Support Ticket API",
    version: "1.0.0",
    description: "API documentation for Support Ticket Management system",
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Local server",
    },
  ],
  tags: [
    { name: "Auth", description: "Authentication endpoints" },
    { name: "Users", description: "User endpoints" },
    { name: "Tickets", description: "Ticket endpoints" },
    { name: "Comments", description: "Comment endpoints" },
  ],
  paths: {
    ...authPaths,
    ...userPaths,
    ...ticketPaths,
    ...commentPaths,
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
    schemas: {
      ...commonSchemas,
      ...authSchemas,
      ...userSchemas,
      ...ticketSchemas,
      ...commentSchemas,
    },
  },
};

export default swaggerSpec;