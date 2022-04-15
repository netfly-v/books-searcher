import axios from 'axios';

const API_KEY = 'AIzaSyDIMTzLqlElSL1GeqQLn1I607d4uVWQBKY';

export const booksAPI = {
  getBookInfo(bookId) {
    return axios
      .get(`https://www.googleapis.com/books/v1/volumes/${bookId}?key=${API_KEY}`)
      .then(response => response.data.volumeInfo);
  },
  getBooks({ query, subject, startIndex = 0, orderBy, maxResults }) {
    return axios
      .get(
        `https://www.googleapis.com/books/v1/volumes?q=${query}+subject:${subject}&maxResults=${maxResults}&startIndex=${startIndex}&orderBy=${orderBy}&key=${API_KEY}`
      )
      .then(response => {
        const { items: books, totalItems } = response.data;
        
        return {
          books,
          totalItems,
        };
      });
  },
};
