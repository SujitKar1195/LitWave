import {useEffect, useState} from 'react';
import axios from 'axios';
import BookCard from '../BookCard/BookCard';
import Loader from '../../components/Loader/Loader';
const RecentlyAdded = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        'http://localhost:8080/api/v1/get-recent-books'
      );
      const fetchedData = response.data;
      setData(fetchedData.data);
    };
    fetch();
  }, []);
  return (
    <div className='mt-12 px-8'>
      <h1 className='text-3xl text-yellow-100'>Recently added books</h1>
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

export default RecentlyAdded;
