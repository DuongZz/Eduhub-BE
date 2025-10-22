import cors from "cors"

const corsOption = {
    origin: ['https://eduhub-fe-eight.vercel.app/', 'https://eduhub-fe-eight.vercel.app/'],
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    optionsSuccessStatus: 204,
    credentials: true
}

export default cors(corsOption)
