import {useParams} from 'react-router-dom';
import {useState, useEffect} from 'react';
import axios from 'axios';
import {GrLanguage} from 'react-icons/gr';
import Loader from '../Loader/Loader';

const ViewBook = () => {
  const {id} = useParams();
  const [data, setData] = useState();
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        `http://localhost:8080/api/v1/get-book/${id}`
      );
      const fetchedData = response.data;
      setData(fetchedData.data);
      //console.log(data);
    };
    fetch();
  }, []);
  return (
    <>
      {data && (
        <div className='px-8 md:px-12 py-8 bg-zinc-900 flex flex-col md:flex-row text-white gap-8 '>
          <div className='bg-zinc-800 rounded-md p-4 h-[60vh] lg:h-[88vh] w-full lg:w-3/6 flex items-center justify-center'>
            <img
              className='h-[50vh] lg:h-[70vh] rounded-md'
              src={data.url}
              alt={data.title}
            />
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
