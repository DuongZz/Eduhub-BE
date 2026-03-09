import cors from "cors"

const defaultAllowedOrigins = [
    'https://eduhub-fe-eight.vercel.app',
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'http://localhost:3001',
    'http://127.0.0.1:3001',
    'http://localhost:5173',
    'http://127.0.0.1:5173',
];

const envAllowedOrigins = (process.env.CORS_ORIGINS || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);

const allowedOrigins = new Set<string>([...defaultAllowedOrigins, ...envAllowedOrigins]);

const corsOption: cors.CorsOptions = {
    origin: (origin, callback) => {
        // Allow non-browser clients (no Origin header)
        if (!origin) return callback(null, true);
        if (allowedOrigins.has(origin)) return callback(null, true);
        return callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    optionsSuccessStatus: 204,
    credentials: true
}

export default cors(corsOption)
