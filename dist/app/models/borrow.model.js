"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Borrow = void 0;
const mongoose_1 = require("mongoose");
const borrowSchema = new mongoose_1.Schema({
    book: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Book', required: true },
    quantity: { type: Number, required: true, min: 1 },
    dueDate: { type: Date, required: true }
}, {
    versionKey: false,
    timestamps: true
});
borrowSchema.path('dueDate').validate((v) => v.getTime() > Date.now());
exports.Borrow = (0, mongoose_1.model)('Borrow', borrowSchema);
