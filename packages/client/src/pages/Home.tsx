import React, { useEffect, useState } from 'react'
import { httpGet } from '../services/api-service';

const Home = () => {

  const [books, setBooks] = useState([]);
  
  useEffect(() => {
    (async () => {
      const _books = await httpGet('/api/books');
      console.log('books list', _books);
    })();
  }, []);

  return (
    <div>Home</div>
  )
}

export default Home