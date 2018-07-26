import React, { Component } from 'react';
import bookPlaceHolder from './icons/book-placeholder.svg';
import PropTypes from 'prop-types';

class SearchBooks extends Component {

  static propTypes = {
    searchResults: PropTypes.array
  }

  render() {
    const searchResults = this.props.searchResults;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <a className="close-search" onClick={() => window.location.href = './'}>Close</a>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.props.searchQuery}
              onChange={(event) => {
                (event.target.value !== '') ? this.props.onQueryUpdate(event.target.value) : this.props.onEmptyQuery(event.target.value)
                }
              }
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {Array.isArray(searchResults) ? (searchResults.length === 0 ?
            (<li>No results to display...</li>) : searchResults.map((book) => (
             <li key={book.id}>
              <div className="book">
                <div className="book-top">
                  <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks ? book.imageLinks.thumbnail : bookPlaceHolder})` }}></div>
                  <div className="book-shelf-changer">
                  <select
                    onChange={(event) => this.props.onUpdateBook(book, event.target.value)}
                    defaultValue={book.shelf || "none"}
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
                <div className="book-authors">{book.authors ? book.authors.join(', ') : 'Autor unknown'}</div>
              </div>
            </li>))) :
            <li>Query not allowed</li>}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBooks;
