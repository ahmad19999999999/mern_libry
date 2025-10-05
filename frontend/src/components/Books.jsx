import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import BorrowingModal from "./BorrowingModal";
import ReturnModal from "./ReturnModal";
import "../Style/componentStyles/Book.css";

const BookCard = ({ book, onUpdateBook }) => {
  const { user: currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [isBorrowModalOpen, setIsBorrowModalOpen] = useState(false);
  const [isReturnModalOpen, setIsReturnModalOpen] = useState(false);
  const [localBorrowingBy, setLocalBorrowingBy] = useState(book.borrowingBy);

  useEffect(() => {
    setLocalBorrowingBy(book.borrowingBy);
  }, [book.borrowingBy]);

  const handleButtonClick = () => {
    if (!currentUser) return navigate("/login");
    if (localBorrowingBy === currentUser._id) setIsReturnModalOpen(true);
    else if (!localBorrowingBy) setIsBorrowModalOpen(true);
  };

  const handleBorrowClose = (isSuccess) => {
    setIsBorrowModalOpen(false);
    if (isSuccess) {
      setLocalBorrowingBy(currentUser._id);
      onUpdateBook?.({ ...book, borrowingBy: currentUser._id });
    }
  };

  const handleReturnClose = (isSuccess) => {
    setIsReturnModalOpen(false);
    if (isSuccess) {
      setLocalBorrowingBy(null);
      onUpdateBook?.({ ...book, borrowingBy: null });
    }
  };

  const getBookStatus = () => {
    if (currentUser && localBorrowingBy === currentUser._id)
      return { status: "Borrowed by you", button: "Return" };
    if (!localBorrowingBy) return { status: "Available", button: "Borrow" };
    return { status: "Borrowed by another user", button: "Borrowed" };
  };

  const getButtonClass = () => {
    if (localBorrowingBy === currentUser?._id) return "borrowed-by-you";
    if (!localBorrowingBy) return "available";
    return "disabled";
  };

  const { status, button } = getBookStatus();
  const isBorrowedByOther = localBorrowingBy && localBorrowingBy !== currentUser?._id;

  return (
    <div className="book-card">
      <img src={book.coverImage} alt={book.title} className="book-image-card" />
      <div className="book-details">
        <h3 className="book-title">{book.title}</h3>
        <p className="book-description"><strong>Author:</strong> {book.author}</p>
        <p className="book-description"><strong>ISBN:</strong> {book.isbn}</p>
        <p className="book-description"><strong>Status:</strong> {status}</p>
        <button
          className={`add-to-borrow ${getButtonClass()}`}
          onClick={handleButtonClick}
          disabled={isBorrowedByOther}
        >
          {button}
        </button>
      </div>
      {isBorrowModalOpen && <BorrowingModal book={book} onClose={handleBorrowClose} />}
      {isReturnModalOpen && <ReturnModal book={book} onClose={handleReturnClose} />}
    </div>
  );
};

export default BookCard;
