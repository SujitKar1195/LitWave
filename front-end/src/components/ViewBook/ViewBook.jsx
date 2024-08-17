import {useParams, useNavigate, Link} from 'react-router-dom';
import {useState, useEffect} from 'react';
import axios from 'axios';
import {useSelector} from 'react-redux';
import {GrLanguage} from 'react-icons/gr';
import Loader from '../Loader/Loader';
import {CiShoppingCart} from 'react-icons/ci';
import {FaHeart} from 'react-icons/fa';
import {CiEdit} from 'react-icons/ci';
import {MdDelete} from 'react-icons/md';
const ViewBook = () => {
  const {id} = useParams();
  const [data, setData] = useState();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);
  const navigate = useNavigate();
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        `https://lit-wave.vercel.app/api/v1/get-book/${id}`
      );
      const fetchedData = response.data;
      setData(fetchedData.data);
      //console.log(data);
    };
    fetch();
  }, []);

  const headers = {
    id: localStorage.getItem('id'),
    authorization: `Bearer ${localStorage.getItem('token')}`,
    bookid: id,
  };

  const handleFavourite = async () => {
    const response = await axios.put(
      'https://lit-wave.vercel.app/api/v1/add-book-to-favourites',
      {},
      {headers}
    );
    alert(response.data.message);
  };
  const handleCart = async () => {
    const response = await axios.put(
      'https://lit-wave.vercel.app/api/v1/add-to-cart',
      {},
      {headers}
    );
    alert(response.data.message);
  };
  const handleDelete = async () => {
    const res = await axios.delete(
      'https://lit-wave.vercel.app/api/v1/delete-book',
      {
        headers,
      }
    );
    alert(res.data.message);
    navigate('/all-books');
  };

  return (
    <>
      {data && (
        <div className='px-8 md:px-12 py-8 bg-zinc-900 flex flex-col lg:flex-row text-white  '>
          <div className='w-full lg:w-3/6  '>
            <div className='flex flex-col lg:flex-row justify-around bg-zinc-800 p-4 rounded-md'>
              <img
                className='h-[50vh] md:h-[60vh] lg:h-[70vh] rounded-md'
                src={data.url}
                alt={data.title}
              />
              {isLoggedIn === true && role === 'user' && (
                <div className='flex flex-row items-center justify-center gap-4 lg:justify-start  lg:flex-col mt-4 lg:mt-0'>
                  <button
                    className='bg-white text-red-700 rounded-full text-3xl p-2 '
                    onClick={handleFavourite}
                  >
                    <FaHeart className='hover:text-red-900 transition-all duration-200' />
                  </button>
                  <button
                    className='bg-blue-500 text-white rounded-full text-3xl p-2 mt-0 lg:mt-4'
                    onClick={handleCart}
                  >
                    {' '}
                    <CiShoppingCart className='hover:text-blue-900 transition-all duration-200' />{' '}
                  </button>
                </div>
              )}
              {isLoggedIn === true && role === 'admin' && (
                <div className='flex  items-center justify-center gap-4 lg:justify-start flex-row lg:flex-col mt-4 lg:mt-0'>
                  <Link
                    to={`/updateBook/${id}`}
                    className=' bg-blue-500  text-zinc-50  rounded-full text-3xl p-2 '
                  >
                    <CiEdit />
                  </Link>
                  <button
                    className=' bg-zinc-100 text-red-700 rounded-full text-3xl p-2 mt-0 lg:mt-4'
                    onClick={handleDelete}
                  >
                    {' '}
                    <MdDelete />{' '}
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className='p-4 w-full lg:w-3/6'>
            <h1 className='text-4xl text-zinc-300 font-semibold'>
              {data.title}
            </h1>
            <p className='text-zinc-400 mt-1'>by {data.author}</p>
            <p className='text-zinc-500 mt-4'>{data.desc}</p>
            <p className='flex mt-4 items-center justify-start text-zinc-400'>
              <GrLanguage className='me-3' />
              {data.language}
            </p>
            <p className='mt-4  text-2xl text-zinc-200 font-serif'>
              Price : ₹ {data.price}{' '}
            </p>
          </div>
        </div>
      )}
      {!data && (
        <div className='h-screen bg-zinc-900 flex items-center justify-center'>
          {' '}
          <Loader />
        </div>
      )}
    </>
  );
};

export default ViewBook;
