import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { key } from '../mainPage/MainPage';
import styles from './BooksList.module.css';

export const BooksList = ({ books, setBooks, search}) => {
  const [startIndex, setStartIndex] = useState(0);

  const navigate = useNavigate();

  const openBookInfo = id => {
    navigate(`/bookPage/${id}`);
  };

  useEffect(() => {
    axios
      .get(
        `https://www.googleapis.com/books/v1/volumes?q=${search.query}+subject:${search.subject}&startIndex=${startIndex}&orderBy=${search.orderBy}&key=${key}`
      )
      .then(response => {
        setBooks({ ...books, items: [...books.items, ...response.data.items] });
      });
  }, [startIndex]);

  return (
    <>
      {books.totalItems && <p className={styles.foundTitle}>Found {books.totalItems} results</p>}
      <div className={styles.content}>
        {books.items
          ? books.items.map(book => (
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
      {books.items && (
        <button
          className={styles.loadMore}
          onClick={() => {
            setStartIndex(startIndex + 10);
          }}
        >
          Load more...
        </button>
      )}
    </>
  );
};
