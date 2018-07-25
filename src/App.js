import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelves from './BookShelves'
import SearchBooks from './SearchBooks'
import * as BooksAPI from './BooksAPI'

class BooksApp extends React.Component {
  state = {
    booksOnShelves: [],
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false
  }


  getBooks = () => {
    BooksAPI.getAll().then((books) => {
      this.setState({ booksOnShelves: books });
    })
  }

  componentDidMount() {
    this.getBooks();
  }

  updateBook = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {this.getBooks()});
  }

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <SearchBooks />
        ) : (
          <div>
            <BookShelves
              booksOnShelves={ this.state.booksOnShelves } s={ this.state.showSearchPage }
              onUpdateBook={this.updateBook}
              />
            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
          </div>
          )
        }
      </div>
    );
  }
}

export default BooksApp;
