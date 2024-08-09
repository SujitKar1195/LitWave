import {useState, useEffect} from 'react';
import axios from 'axios';
import Loader from '../components/Loader/Loader';
import BookCard from '../components/BookCard/BookCard';
const AllBooks = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        'http://localhost:8080/api/v1/get-all-books'
      );
      const fetchedData = response.data;
      setData(fetchedData.data);
    };
    fetch();
  }, []);
  return (
    <div className='bg-zinc-900 px-4'>
      <h1 className='text-3xl text-yellow-100'>Books</h1>
      {!data && (
        <div className='flex items-center justify-center my-8'>
          {' '}
          <Loader />
        </div>
      )}
      <div className='py-4 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4'>
        {data &&
          data.map((item, i) => (
            <div
              key={i}
              className='transform transition-transform duration-300 hover:scale-105'
            >
              <BookCard data={item} />{' '}
            </div>
          ))}
      </div>
    </div>
  );
};

export default AllBooks;
