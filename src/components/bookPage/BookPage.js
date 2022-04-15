import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './BookPage.module.css';
import backImg from '../../images/back.png';
import { getBookThunk } from '../../store/thunks/bookThunk';
import { connect } from 'react-redux';
import { currentBookSelector } from '../../store/state/books/selectors';

const BookPage = ({ getBook, currentBook }) => {
  const { bookId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getBook(bookId);
  }, [bookId, getBook]);

  const getDescription = () => {
    if (currentBook.description) {
      return { __html: currentBook.description };
    }
  };


  const getBack = () => {
    navigate('/');
  };

  return (
    <div className={styles.bookPage}>
      <div className={styles.bookImage}>
        {currentBook.imageLinks ? (
          <img src={currentBook.imageLinks.smallThumbnail} alt="book img" />
        ) : (
          <img
            src="https://thumbs.dreamstime.com/b/no-image-available-icon-flat-vector-no-image-available-icon-flat-vector-illustration-132482953.jpg"
            alt="no img"
          />
        )}
      </div>
      <div className={styles.bookDetails}>
        <div>
          <p className={styles.category}>{currentBook.categories ? currentBook.categories[0] : 'no category'}</p>
          <p className={styles.title}>{currentBook && currentBook.title}</p>
          <p className={styles.author}>
            {currentBook.authors ? (
              currentBook.authors.map((author, idx) =>
                currentBook.authors.length === idx + 1 ? (
                  <span key={idx}>{author}</span>
                ) : (
                  <span key={idx}>{author}, </span>
                )
              )
            ) : (
              <span>no author</span>
            )}
          </p>
          <div className={styles.about} dangerouslySetInnerHTML={getDescription()}></div>
        </div>
      </div>
      <div className={styles.backButton}>
        <button onClick={getBack}>
          <img src={backImg} alt="back button" />
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  currentBook: currentBookSelector(state),
});

const mapDispatchToProps = {
  getBook: getBookThunk,
};

export default connect(mapStateToProps, mapDispatchToProps)(BookPage);
