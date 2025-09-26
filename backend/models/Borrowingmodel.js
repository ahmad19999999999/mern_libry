// models/Borrowing.js
import mongoose from 'mongoose';

const BorrowingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
  borrowDate: { type: Date, default: Date.now },
  returnDate: { type: Date, default: null },
}, { timestamps: true });

const Borrowing = mongoose.model('Borrowing', BorrowingSchema);
 export default Borrowing;
