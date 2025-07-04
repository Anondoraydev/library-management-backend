import express, { Request, Response } from 'express'
import { Book } from '../models/books.model'
import { FilterQuery, SortOrder } from 'mongoose'
import { IBook } from '../interfaces/books.interface'

export const booksRoutes = express.Router()

//Create books
booksRoutes.post('/', async (req: Request, res: Response) => {
    try {
        const body = req.body
        const data = await Book.create(body)
        res.status(201).json({
            success: true,
            message: "Book created successfully",
            data
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Failed to create book',
            error: (error as Error).message,
        });
    }
})

//get all books with optional filter and sortion
booksRoutes.get('/', async (req: Request, res: Response) => {
    try {
        const { filter, sortBy = 'createdAt', sort = 'desc', limit = '10', page = '1' } = req.query

        const query: FilterQuery<IBook> = {};
        if (filter) {
            query.genre = filter;
        }
        const sortOption: Record<string, SortOrder> = {};
        sortOption[sortBy as string] = sort === 'asc' ? 1 : -1;

        const limitNum = Number(limit);
        const pageNum = Number(page);
        const skip = (pageNum - 1) * limitNum;

        const [books, total] = await Promise.all([
            Book.find(query).sort(sortOption).skip(skip).limit(limitNum),
            Book.countDocuments(query)
        ])
        const totalPages = Math.ceil(total / limitNum);
        res.status(200).json({
            success: true,
            message: "Books retrieved successfully",
             data: {
                books,
                pagination: {
                    total,
                    totalPages,
                    currentPage: pageNum,
                    limit: limitNum
                }
            }
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to retrieve books",
            error: (error as Error).message,
        })
    }

})

//get single book by id
booksRoutes.get('/:bookId', async (req: Request, res: Response) => {
    try {
        const bookId = req.params.bookId
        const data = await Book.findById(bookId)

        res.status(200).json({
            success: true,
            message: "Book retrieved successfully",
            data
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Invalid book ID',
            error: (error as Error).message,
        });
    }

})

//Update single book
booksRoutes.put('/:bookId', async (req: Request, res: Response) => {
    try {
        const bookId = req.params.bookId
        const body = req.body
        const data = await Book.findByIdAndUpdate(bookId, body, { new: true })

        res.status(200).json({
            success: true,
            message: "Book updated successfully",
            data
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Failed to update book',
            error: (error as Error).message,
        });
    }

})

//Delete single book
booksRoutes.delete('/:bookId', async (req: Request, res: Response) => {
    try {
        const bookId = req.params.bookId
        await Book.findByIdAndDelete(bookId)

        res.status(200).json({
            success: true,
            message: "Book deleted successfully",
            data: null
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Failed to delete book',
            error: (error as Error).message,
        });
    }

})