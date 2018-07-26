import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelves from './BookShelves'
import SearchBooks from './SearchBooks'
import * as BooksAPI from './BooksAPI'

class BooksApp extends React.Component {
  state = {
    booksOnShelves: [],
    booksFound: [],
    query: '',
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false
  }

 //Get all the books with BooksAPI and set the state with fetched books
  getBooks = () => {
    BooksAPI.getAll().then((books) => {
      this.setState({ booksOnShelves: books });
    })
  }

  //Get books when component mounts
  componentDidMount() {
    this.getBooks();
  }

  //Update book's shelf, get updated books (and set state)
  updateBook = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {this.getBooks()});
  }

  //Functions for search feature
  updateQuery = (query) => {
    BooksAPI.search(query).then((books) => {
      this.checkShelves(books);
      this.setState({query: query, booksFound: books})

    })
  }

  clearQuery = () => {
    this.setState({booksFound: [], query: ''});
  }

  //FUpdates search results drop downs when item present on Book shelf already
  checkShelves = (finds) => {
    let ResultsIds = finds.map(book => book.id);
    let ShelvesIds = this.state.booksOnShelves.map(book => book.id);

    let commons = ResultsIds.filter(id => ShelvesIds.includes(id));
    let shelves = this.state.booksOnShelves;

    commons.forEach(el => {
      let idFound = finds.findIndex(item => item.id === el);
      let idShelf = shelves.findIndex(item => item.id === el);

      finds[idFound].shelf = shelves[idShelf].shelf;

    });
  }

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <SearchBooks
          booksOnShelves={this.state.booksOnShelves}
          searchResults={this.state.booksFound}
          searchQuery={this.state.query}
          onQueryUpdate={this.updateQuery}
          onEmptyQuery={this.clearQuery}
          onUpdateBook={this.updateBook}
          />
        ) : (
          <div>
            <BookShelves
              booksOnShelves={this.state.booksOnShelves} s={this.state.showSearchPage}
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
