import React from 'react'
import '../Style/componentStyles/NoBooks.css'

const Nobooks = ({ keyword }) => { 
  return (
    <div className='no-books-content'>
      <div className='no-books-icon'>⚠️</div>
      <h3 className='no-books-title'>No Books Found</h3>
      <p className="no-books-message">
        {keyword
          ? `We couldn't find any books matching "${keyword}". Try using different keywords or browse our complete catalog.`
          : 'No books found. Try browsing our catalog.'}
      </p>
    </div>
  )
}

export default Nobooks

