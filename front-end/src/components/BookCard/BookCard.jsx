import {Link} from 'react-router-dom';
import axios from '../../api/axios';
import {useEffect} from 'react';
const BookCard = ({data, favourite}) => {
  const headers = {
    id: localStorage.getItem('id'),
    authorization: `Bearer ${localStorage.getItem('token')}`,
    bookid: data._id,
  };

  const handleRemoveBook = async () => {
    const response = await axios.put(
      '/api/v1/remove-book-from-favourites',
      {},
      {headers}
    );
    alert(response.data.message);
  };
  return (
    <div className='bg-zinc-800 rounded-md p-4'>
      <Link to={`/book/${data._id}`}>
        <div className=''>
          <div className='bg-zinc-900 rounded-md flex items-center justify-center'>
            <img
              className='h-[25vh] rounded-md'
              src={data.url}
              alt=''
            />
          </div>
          <h2 className='mt-4 text-xl text-zinc-100'>{data.title}</h2>
          <p className='mt-2 text-zinc-100 font-thin'>by {data.author}</p>
          <p className='mt-2 text-zinc-100 text-sm'>₹ {data.price}</p>
        </div>
      </Link>
      {favourite && (
        <button
          className='bg-red-800 text-white text-xl rounded-md px-4 py-2 font-sans font-normal mt-4'
          onClick={handleRemoveBook}
        >
          Remove from Favourites
        </button>
      )}
    </div>
  );
};

export default BookCard;
