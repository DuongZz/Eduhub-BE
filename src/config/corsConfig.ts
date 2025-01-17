import cors from "cors"

const corsOption = {
    origin: ['https://eduhub-zvij.onrender.com/', 'https://eduhub-zvij.onrender.com/'],
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    optionsSuccessStatus: 204,
    credentials: true
}

export default cors(corsOption)
