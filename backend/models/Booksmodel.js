import mongoose from "mongoose";

const BookSchema = new mongoose.Schema({
  title: { type: String, required: true, index: true },
  author: { type: String, required: true, index: true },
  isbn: { type: String, required: true, unique: true, index: true },
  isAvailable: { type: Boolean, default: true },
  coverImage: { type: String, default: "" },
  borrowingBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
}, { timestamps: true });

const BooK = mongoose.model('Book', BookSchema);

export default BooK;