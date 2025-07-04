"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const borrow_controller_1 = require("./app/controllers/borrow.controller");
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const books_controller_1 = require("./app/controllers/books.controller");
const app = (0, express_1.default)();
//cors
app.use((0, cors_1.default)());
// Middleware
app.use(express_1.default.json());
// Routes
app.use("/api/books", books_controller_1.booksRoutes);
app.use('/api/borrow', borrow_controller_1.borrowRoutes);
app.get('/', (req, res) => {
    res.send("Welcome to Library Management");
});
// 404 error handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found',
    });
});
exports.default = app;
