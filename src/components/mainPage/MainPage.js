import axios from 'axios';
import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { BookPage } from '../bookPage/BookPage';
import { BooksList } from '../booksList/BooksList';
import { SearchBar } from '../searchBar/SearchBar';
import styles from './MainPage.module.css';

export const key = 'AIzaSyDIMTzLqlElSL1GeqQLn1I607d4uVWQBKY';

export const MainPage = () => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState({ query: '', subject: '', orderBy: 'relevance' });

  const searchBooks = searchParams => {
    setSearch(searchParams);

    return axios
      .get(
        `https://www.googleapis.com/books/v1/volumes?q=${searchParams.query}+subject:${searchParams.subject}&maxResults=10&startIndex=0&orderBy=${searchParams.orderBy}&key=${key}`
      )
      .then(response => {
        console.log(response.data);
        setBooks(response.data);
      });
  };

  return (
    <div className={styles.mainPage}>
      <BrowserRouter>
        <SearchBar search={search} searchBooks={searchBooks}/>
        <Routes>
          <Route path="/" element={<BooksList books={books} setBooks={setBooks} search={search} key={key}/>} />
          <Route path="/bookPage/:bookId" element={<BookPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};
