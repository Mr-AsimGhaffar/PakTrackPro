const defaultAllowedOrigins = [
  "https://paktrackpro.com",
  "https://www.paktrackpro.com",
  "https://pak-track-pro.vercel.app",
  "http://localhost:8080",
  "http://localhost:5173",
];

const getAllowedOrigins = () => {
  const extraOrigins = (process.env.CORS_ALLOWED_ORIGINS || "")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);

  return new Set([...defaultAllowedOrigins, ...extraOrigins]);
};

const applyCors = (request, response) => {
  const origin = request.headers.origin;
  const allowedOrigins = getAllowedOrigins();

  if (origin && allowedOrigins.has(origin)) {
    response.setHeader("Access-Control-Allow-Origin", origin);
    response.setHeader("Vary", "Origin");
  }

  response.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
  response.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization",
  );
};

export default function handler(request, response) {
  applyCors(request, response);

  if (request.method === "OPTIONS") {
    return response.status(204).end();
  }

  if (request.method !== "GET") {
    return response.status(405).json({ message: "Method Not Allowed" });
  }

  return response.status(200).json({ status: "ok" });
}
