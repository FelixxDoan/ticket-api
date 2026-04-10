import crypto from 'crypto'

const requestIdMiddleware =() => (req, res, next) => {
  const incoming = req.headers["x-request-id"];
  let requestId = typeof incoming === "string" ? incoming.trim() : "";

  if (!requestId || requestId.length > 128) requestId = crypto.randomUUID();

  req.requestId = requestId;
  res.setHeader("x-request-id", requestId);
  next();
};

export default requestIdMiddleware