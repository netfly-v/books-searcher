import { BrowserRouter, Route, Routes } from 'react-router-dom';
import BookPage from '../bookPage/BookPage';
import BooksList from '../booksList/BooksList';
import SearchBar from '../searchBar/SearchBar';
import styles from './MainPage.module.css';

export const MainPage = () => (
  <div className={styles.mainPage}>
    <BrowserRouter>
      <SearchBar />
      <Routes>
        <Route path="/" element={<BooksList />} />
        <Route path="/bookPage/:bookId" element={<BookPage />} />
      </Routes>
    </BrowserRouter>
  </div>
);
