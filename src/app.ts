import { borrowRoutes } from './app/controllers/borrow.controller';
import cors from 'cors';
import express, { Application, Request, Response } from 'express'
import { booksRoutes } from './app/controllers/books.controller'

const app: Application = express()
//cors
app.use(cors({
    origin: ['http://localhost:5173', 'https://library-management-system-frontend-eight.vercel.app']
}));

// Middleware
app.use(express.json())

// Routes
app.use("/api/books", booksRoutes)
app.use('/api/borrow', borrowRoutes);

app.get('/', (req: Request, res: Response) => {
    res.send("Welcome to Library Management")
})

// 404 error handler
app.use((req: Request, res: Response) => {
    res.status(404).json({
        success: false,
        message: 'Route not found',
    });
})

export default app;