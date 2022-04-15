import { useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { booksSelector } from '../../store/state/books/selectors';
import { searchSelector } from '../../store/state/search/selectors';
import { searchBooksThunk } from '../../store/thunks/bookThunk';
import { SUBJECT, ORDER } from '../../utils/constants';
import styles from './SearchBar.module.css';

const SearchBar = ({ search, searchBooks }) => {
  const [searchValue, setSearchValue] = useState('');
  const [cat, setCat] = useState(SUBJECT.ALL);
  const [orderBy, setOrderBy] = useState(ORDER.RELEVANCE);

  const navigate = useNavigate();

  const getSearchString = () => {
    if (searchValue) {
      searchBooks({ ...search, query: searchValue, subject: cat, orderBy }).then(() => navigate('/'));
    }
  };

  return (
    <div className={styles.searchBar}>
      <p className={styles.searchTitle}>Search for books</p>
      <div className={styles.search}>
        <input type="search" className={styles.searchInput} onChange={({ target }) => setSearchValue(target.value)} />
        <button onClick={getSearchString}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/OOjs_UI_icon_search-ltr.svg/1024px-OOjs_UI_icon_search-ltr.svg.png"
            alt="back button"
          />
        </button>
      </div>
      <div className={styles.sort}>
        <span className={styles.sortTitle}>Categories</span>
        <select onChange={({ target }) => setCat(target.value)}>
          <option value={SUBJECT.ALL}>all</option>
          <option value={SUBJECT.ART}>Art</option>
          <option value={SUBJECT.COMPUTERS}>Computers</option>
          <option value={SUBJECT.COOKING}>Cooking</option>
          <option value={SUBJECT.HISTORY}>History</option>
          <option value={SUBJECT.MEDICAL}>Medical</option>
          <option value={SUBJECT.POETRY}>Poetry</option>
        </select>
        <span className={styles.sortTitle}>Sorting by</span>
        <select onChange={({ target }) => setOrderBy(target.value)}>
          <option value={ORDER.RELEVANCE}>relevance</option>
          <option value={ORDER.NEWEST}>newest</option>
        </select>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  search: searchSelector(state),
  books: booksSelector(state),
});

const mapDispatchToProps = {
  searchBooks: searchBooksThunk,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
