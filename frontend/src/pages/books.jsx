import React, { useEffect, useState } from 'react';
import PageTitle from '../components/PageTitle.jsx';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import '../Style/pageStyles/Books.css';
import { useDispatch, useSelector } from 'react-redux';
import BookCard from '../components/Books.jsx';
import Loader from '../components/Loader.jsx';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation, useNavigate } from 'react-router-dom';
import Nobooks from '../components/Nobooks.jsx';
import Pagination from '../components/Pagination.jsx';
import { getbooks, removeError } from '../slice/books/booksslice.js';

const Books = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, books = [], error, totalPages = 1 } = useSelector(
    (state) => state.books
  );

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const keyword = searchParams.get('keyword') || '';
  const pagefromurl = parseInt(searchParams.get('page'), 10) || 1;
  const [currentpage, setcurrentpage] = useState(pagefromurl);

  const [localBooks, setLocalBooks] = useState([]);

 
  useEffect(() => {
    setLocalBooks(books);
  }, [books]);

  const handelpagechange = (page) => {
    if (page !== currentpage) {
      setcurrentpage(page);
      const newsearchParams = new URLSearchParams(location.search);
      if (page === 1) {
        newsearchParams.delete('page');
      } else {
        newsearchParams.set('page', page);
      }
      navigate(`?${newsearchParams.toString()}`);
    }
  };

  useEffect(() => {
    dispatch(getbooks({ keyword, page: currentpage }));
  }, [dispatch, keyword, currentpage]);

  useEffect(() => {
    if (error) {
      toast.error('No books found', {
        position: 'top-center',
        autoClose: 3000,
      });
      dispatch(removeError());
    }
  }, [dispatch, error]);


  const handleUpdateBook = (updatedBook) => {
    setLocalBooks(prev =>
      prev.map(b => (b._id === updatedBook._id ? updatedBook : b))
    );
  };

  return (
    <>
      <PageTitle title="All Books" />
      <Navbar />

      <div className="books-layout">
        <div className="books-section">
          <div className="books-book-container">
            {loading ? (
              <Loader />
            ) : localBooks.length > 0 ? (
              localBooks.map((book, index) => (
                <BookCard
                  book={book}
                  key={book._id || book.id || index}
                  onUpdateBook={handleUpdateBook}
                />
              ))
            ) : (
              <Nobooks keyword={keyword} />
            )}
          </div>

          {!loading && totalPages > 1 && localBooks.length > 0 && (
            <Pagination
              currentpage={currentpage}
              totalPages={totalPages}
              onpagechange={handelpagechange}
            />
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Books;
