import React, { useEffect } from "react";
import ReactDOM from "react-dom"; // لازم نستورد ReactDOM
import { useDispatch, useSelector } from "react-redux";
import { returnBook, removeError, removeSuccess } from "../slice/borrowing/borrowing";
import { toast } from "react-toastify";
import "../Style/UserStyles/Model.css";


const ReturnModal = ({ book, onClose }) => {
  const dispatch = useDispatch();
  const { error, success, loading } = useSelector((state) => state.borrowing);


  useEffect(() => {
    if (error) {
      toast.error(error, { position: "top-center", autoClose: 3000 });
      dispatch(removeError());
    }
    if (success) {
      toast.success("Book returned successfully", { position: "top-center", autoClose: 3000 });
      dispatch(removeSuccess());
      onClose();
    }
  }, [error, success, dispatch, onClose]);

  const handleReturn = async (e) => {
    e.preventDefault();
    try {
      await dispatch(returnBook({ bookId: book._id })).unwrap();
      
    } catch (err) {
      console.error("Failed to return book:", err);
    }
  };

 
  return ReactDOM.createPortal(
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Return Book</h2>
        <form onSubmit={handleReturn}>
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
            <label>Returned Date</label>
            <input type="text" value={new Date().toLocaleDateString()} readOnly />
          </div>

          <button type="submit" className="authBtn" disabled={loading}>
            {loading ? "Processing..." : "Confirm Return"}
          </button>
          <button type="button" className="authBtn" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>,
    document.body  
  );
};

export default ReturnModal;
