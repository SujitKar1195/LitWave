import {useState, useEffect} from 'react';
import axios from '../api/axios';
import Loader from '../components/Loader/Loader';
import BookCard from '../components/BookCard/BookCard';
const AllBooks = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        '/api/v1/get-all-books'
      );
      const fetchedData = response.data;
      setData(fetchedData.data);
    };
    fetch();
  }, []);
  return (
    <div className='bg-zinc-900 px-4'>
      {!data && (
        <div className='h-screen flex items-center justify-center py-4'>
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
              <BookCard
                key={i + 99}
                data={item}
              />{' '}
            </div>
          ))}
      </div>
    </div>
  );
};

export default AllBooks;
