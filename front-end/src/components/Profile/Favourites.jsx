import React, {useEffect, useState} from 'react';
import axios from 'axios';
import BookCard from '../BookCard/BookCard';
import {IoHeartDislikeCircleOutline} from 'react-icons/io5';
const Favourites = () => {
  const [favouriteBooks, setFavouriteBooks] = useState([]);

  const headers = {
    id: localStorage.getItem('id'),
    authorization: `Bearer ${localStorage.getItem('token')}`,
  };
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        'http://localhost:8080/api/v1/get-favourite-books',
        {headers}
      );
      setFavouriteBooks(response.data.data);
    };
    fetch();
  }, [favouriteBooks]);

  return (
    <>
      {favouriteBooks.length === 0 && (
        <>
          <div className='text-4xl font-semibold text-zinc-300 flex flex-col items-center justify-center '>
            <p>No favourite books</p>
            <IoHeartDislikeCircleOutline className='text-8xl font-semibold text-center text-yellow-800' />
          </div>
        </>
      )}
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
        {favouriteBooks &&
          favouriteBooks.map((item, i) => (
            <div
              key={i}
              className='transform transition-transform duration-300 hover:scale-105'
            >
              <BookCard
                data={item}
                favourite={true}
              />
            </div>
          ))}
      </div>
    </>
  );
};

export default Favourites;
