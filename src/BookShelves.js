import React, { Component } from 'react';
import PropTypes from 'prop-types';

class BookShelves extends Component {

static propTypes = {
  showingBooks: PropTypes.array,
  updateBook: PropTypes.func
}

  render() {
    const showingBooks = this.props.booksOnShelves;
    const updateBook = this.props.onUpdateBook;

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Currently Reading</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                {showingBooks.filter((book) => book.shelf === 'currentlyReading').map((book) => (
                  <li key={book.id}>
                    <div className="book">
                      <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                        <div className="book-shelf-changer">
                          <select
                            onChange={(event) => updateBook(book, event.target.value)}
                            defaultValue={book.shelf}
                            >
                            <option value="move" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                          </select>
                        </div>
                      </div>
                      <div className="book-title">{book.title}. {book.subtitle}</div>
                      <div className="book-authors">{book.authors.join(', ')}</div>
                    </div>
                  </li>
                ))}
                </ol>
              </div>
              <h2 className="bookshelf-title">Want to Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                {showingBooks.filter((book) => book.shelf === 'wantToRead').map((book) => (
                  <li key={ book.id }>
                    <div className="book">
                      <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                        <div className="book-shelf-changer">
                        <select
                          onChange={(event) => updateBook(book, event.target.value)}
                          defaultValue={book.shelf}
                          >
                            <option value="move" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                          </select>
                        </div>
                      </div>
                      <div className="book-title">{book.title}. {book.subtitle}</div>
                      <div className="book-authors">{book.authors.join(', ')}</div>
                    </div>
                  </li>
                ))}
                </ol>
              </div>
              <h2 className="bookshelf-title">Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                {showingBooks.filter((book) => book.shelf === 'read').map((book) => (
                  <li key={ book.id }>
                    <div className="book">
                      <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                        <div className="book-shelf-changer">
                        <select
                          onChange={(event) => updateBook(book, event.target.value)}
                          defaultValue={book.shelf}
                          >
                            <option value="move" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                          </select>
                        </div>
                      </div>
                      <div className="book-title">{book.title}. {book.subtitle}</div>
                      <div className="book-authors">{book.authors.join(', ')}</div>
                    </div>
                  </li>
                ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default BookShelves;
