import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { booksSelector, totalItemsSelector } from '../../store/state/books/selectors';
import { loadMoreBooksThunk } from '../../store/thunks/bookThunk';
import styles from './BooksList.module.css';

const BooksList = ({ books, loadMoreBooks, totalItems }) => {
  const navigate = useNavigate();

  const openBookInfo = id => {
    navigate(`/bookPage/${id}`);
  };

  return (
    <>
      {totalItems ? <p className={styles.foundTitle}>Found {totalItems} results</p> : null}
      <div className={styles.content}>
        {books.length
          ? books.map(book => (
              <div className={styles.searchItem} key={book.etag} onClick={() => openBookInfo(book.id)}>
                {book.volumeInfo.imageLinks ? (
                  <img src={book.volumeInfo.imageLinks.thumbnail} alt="book img" />
                ) : (
                  <img
                    src="https://thumbs.dreamstime.com/b/no-image-available-icon-flat-vector-no-image-available-icon-flat-vector-illustration-132482953.jpg"
                    alt="no img"
                  />
                )}

                <p className={styles.category}>
                  {book.volumeInfo.categories ? book.volumeInfo.categories[0] : 'no category'}
                </p>
                <p className={styles.description}>{book.volumeInfo.title}</p>
                <p className={styles.author}>
                  {book.volumeInfo.authors ? (
                    book.volumeInfo.authors.map((author, idx) =>
                      book.volumeInfo.authors.length === idx + 1 ? (
                        <span key={idx}>{author}</span>
                      ) : (
                        <span key={idx}>{author}, </span>
                      )
                    )
                  ) : (
                    <span>no author</span>
                  )}
                </p>
              </div>
            ))
          : null}
      </div>
      {books.length ? (
        <button className={styles.loadMore} onClick={loadMoreBooks}>
          Load more...
        </button>
      ) : null}
    </>
  );
};

const mapStateToProps = state => ({
  books: booksSelector(state),
  totalItems: totalItemsSelector(state),
});

const mapDispatchToProps = {
  loadMoreBooks: loadMoreBooksThunk,
};

export default connect(mapStateToProps, mapDispatchToProps)(BooksList);
