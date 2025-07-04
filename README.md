# 📚 Library Management API

A backend REST API for managing a library system — built with **Express**, **TypeScript**, and **MongoDB (Mongoose)**.

This project allows you to manage books and borrowing operations, with full validation, business logic, filtering, and aggregation.

---
## Live Link: https://library-management-lyart-three.vercel.app


## 🚀 Features

- 📘 **Book Management**: Create, read, update, and delete books
- 🧾 **Borrowing System**: Borrow books with quantity tracking and due date validation
- ✅ **Business Logic**: Automatically marks books as unavailable when copies run out
- 🧠 **MongoDB Aggregation**: View total borrowed quantity of each book
- 🛡️ **Schema Validation**: Enforced via Mongoose
- 🛠️ **Mongoose Middleware**: Pre and post hooks for updating availability and logging
- 🔍 **Filtering & Sorting**: Books can be filtered by genre and sorted by fields
- 📦 **Built with TypeScript**: Strong typing using interfaces and model types

---

## 🛠️ Tech Stack

- Node.js + Express.js
- TypeScript
- MongoDB with Mongoose
- Dotenv for environment configuration

---

## 🧑‍💻 Getting Started (Local Setup)

### 1. Clone the repository

```bash
git clone https://github.com/AnsarulIslam10/B5-Assignment-3.git
cd B5-Assignment-3
````

### 2. Install dependencies

```bash
npm install
```

### 3. Create a `.env` file

```env
PORT=5000
DB_USERNAME=your_db_username
DB_PASSWORD=your_db_password
DB_NAME=your_db_name
```

### 4. Start the server

```bash
npm run dev
```

> The server will run at: `http://localhost:5000/`

---

## 📚 API Documentation

### ✅ Base URL

```
http://localhost:5000/api
```

---

### 📘 Book Endpoints

#### ➕ Create a Book

`POST /api/books`

```json
{
  "title": "The Theory of Everything",
  "author": "Stephen Hawking",
  "genre": "SCIENCE",
  "isbn": "9780553380163",
  "description": "An overview of cosmology and black holes.",
  "copies": 5
}
```

#### 📖 Get All Books

`GET /api/books?filter=SCIENCE&sortBy=createdAt&sort=desc&limit=5`

Query Params:

* `filter` = genre
* `sortBy` = createdAt | title | etc.
* `sort` = asc | desc
* `limit` = number of results

#### 🔍 Get a Book by ID

`GET /api/books/:bookId`

#### 📝 Update a Book

`PUT /api/books/:bookId`

```json
{
  "copies": 10
}
```

#### ❌ Delete a Book

`DELETE /api/books/:bookId`

---

### 📦 Borrow Endpoints

#### ➕ Borrow a Book

`POST /api/borrow`

```json
{
  "book": "BOOK_OBJECT_ID",
  "quantity": 2,
  "dueDate": "2025-07-18T00:00:00.000Z"
}
```

* Validates book availability
* Automatically decreases stock
* Marks book as unavailable if stock = 0

#### 📊 Borrow Summary

`GET /api/borrow`

Returns:

```json
{
  "success": true,
  "message": "Borrowed books summary retrieved successfully",
  "data": [
    {
      "book": {
        "title": "The Theory of Everything",
        "isbn": "9780553380163"
      },
      "totalQuantity": 5
    }
  ]
}
```

---

## ❌ Error Format (Standard)

```json
{
  "success": false,
  "message": "Validation failed",
  "error": {
    "name": "ValidationError",
    "errors": {
      "copies": {
        "message": "Copies must be a positive number"
      }
    }
  }
}
```

---