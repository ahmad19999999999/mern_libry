import React, { useEffect } from 'react';
import '../Style/pageStyles/Home.css';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import ImageSlider from '../components/ImageSlider';
import PageTitle from '../components/PageTitle';
import { useDispatch, useSelector } from 'react-redux';
import { getbooks, removeError } from '../slice/books/booksslice';
import { toast } from 'react-toastify';
import BookCard from '../components/Books';
import Loader from '../components/Loader';

const Home = () => {
  const { loading, books = [], error} = useSelector( (state) => state.books); 
  const dispatch = useDispatch();
  useEffect(() => {
     dispatch(getbooks({ keyword:""}));
   }, [dispatch]);
 
   useEffect(() => {
     if (error) {
       toast.error(
          'No books found',
         {
           position: 'top-center',
           autoClose: 3000,
         }
       );
       
        dispatch(removeError());
     }
   }, [dispatch, error]);
  return (
    <>
   {loading ? (<Loader/>):( <>
      <PageTitle title="Library Home" />
      <Navbar />
      <ImageSlider />
      <div className="home-container">
        <h2 className="home-heading">Lending Library</h2>
        <div className="home-product-container">
           {books && books.length > 0 ? (
                books.map((book) => (
                  <BookCard book={book} key={book._id || book.id} />
                ))
              ) : (
                <p>No books available.</p>
              )}
          
        </div>
      </div>
      <Footer />
    </>)}
    </>
  );
};

export default Home;
