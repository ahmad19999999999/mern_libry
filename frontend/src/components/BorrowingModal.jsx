import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactDOM from "react-dom";
import { borrowBook, removeError, removeSuccess } from "../slice/borrowing/borrowing.js";
import { toast } from "react-toastify";
import "../Style/UserStyles/Model.css";


const BorrowingModal = ({ book, onClose }) => {
  const dispatch = useDispatch();
  const { error, success, loading } = useSelector((state) => state.borrowing);
  

 
  useEffect(() => {
    if (error) {
      toast.error(error, { position: "top-center", autoClose: 3000 });
      dispatch(removeError());
    }
    if (success) {
      toast.success("Book borrowed successfully ", { position: "top-center", autoClose: 3000 });
      dispatch(removeSuccess());
      onClose();
    }
  }, [error, success, dispatch, onClose]);

  const handleBorrow = async (e) => {
    e.preventDefault();
    try {
      await dispatch(borrowBook({ bookId: book._id })).unwrap();
    
    } catch (err) {
      console.error("Failed to borrow book:", err);
    }
  };


  return ReactDOM.createPortal(
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Borrow Book</h2>
        <div className="input-group">
          <label>Title</label>
          <input type="text" value={book?.title || ""} readOnly />
        </div>
        <div className="input-group">
          <label>Author</label>
          <input type="text" value={book?.author || ""} readOnly />
        </div>
        <div className="input-group">
          <label>ISBN</label>
          <input type="text" value={book?.isbn || ""} readOnly />
        </div>
        <div className="input-group">
          <label>Borrowing Date</label>
          <input type="text" value={new Date().toLocaleDateString()} readOnly />
        </div>
        <button className="authBtn" onClick={handleBorrow} disabled={loading}>
          Borrow
        </button>
        <button className="authBtn" onClick={onClose}>Cancel</button>
      </div>
    </div>,
    document.body 
  );
};

export default BorrowingModal;
