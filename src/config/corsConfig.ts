import cors from "cors"

const corsOption = {
    origin: ['https://eduhub-zvij.onrender.com/', 'http://localhost:3000'],
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    optionsSuccessStatus: 204,
    credentials: true
}

export default cors(corsOption)
