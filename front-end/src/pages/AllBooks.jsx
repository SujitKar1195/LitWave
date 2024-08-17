import {useState, useEffect} from 'react';
import axios from 'axios';
import Loader from '../components/Loader/Loader';
import BookCard from '../components/BookCard/BookCard';
const AllBooks = () => {
  const [data, setData] = useState();
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
<<<<<<< HEAD
        '/api/v1/get-all-books'
=======
        'https://lit-wave.vercel.app/api/v1/get-all-books'
>>>>>>> b8cfea23ed5eea38e72d8e30e2bb643b5b5ac7ca
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
              <BookCard data={item} />{' '}
            </div>
          ))}
      </div>
    </div>
  );
};

export default AllBooks;
