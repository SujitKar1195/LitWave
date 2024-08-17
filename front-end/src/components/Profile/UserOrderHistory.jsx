import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Loader from '../Loader/Loader';
const UserOrderHistory = () => {
  const [orderHistory, setOrderHistory] = useState();
  const headers = {
    id: localStorage.getItem('id'),
    authorization: `Bearer ${localStorage.getItem('token')}`,
  };
  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get('/api/v1/get-order-history', {headers});
      setOrderHistory(res.data.data);
    };
    fetch();
  }, []);
  return (
    <div>
      {!orderHistory && (
        <div className='bg-zinc-900 flex items-center justify-center h-[100%]'>
          <Loader className='text-4xl' />
        </div>
      )}
      {orderHistory && orderHistory.length === 0 && (
        <>
          <div className='text-zinc-300 flex flex-col items-center justify-center '>
            <h1 className='text-4xl font-semibold'>No Order History</h1>
            <img
              src='https://cdn-icons-png.flaticon.com/128/9961/9961218.png'
              alt=''
              className='h-[20vh] mb-8'
            />
          </div>
        </>
      )}

      {orderHistory && orderHistory.length > 0 && (
        <div className='h-[100%] p-0 md:p-4 text-zinc-100'>
          <h1 className='text-3xl md:text-5xl font-semibold text-zinc-500 mb-8'>
            Your Order History
          </h1>
          <div className='mt-4 bg-zinc-800 w-full  rounded py-2 px-4 flex gap-2'>
            <div className='w-[3%]'>
              <h1 className='text-center'>Sr.</h1>
            </div>
            <div className='w-[22%]'>
              <h1 className=''>Books</h1>
            </div>
            <div className='w-[45%]'>
              <h1 className=''>Description</h1>
            </div>
            <div className='w-[9%]'>
              <h1 className=''>Price</h1>
            </div>
            <div className='w-[16%]'>
              <h1 className=''>Status</h1>
            </div>
            <div className='w-none md:w-[5%] hidden md:block'>
              <h1 className=''>Mode</h1>
            </div>
          </div>
          {orderHistory.map((item, i) => (
            <div className='mt-4 bg-zinc-800 w-full  rounded py-2 px-4 flex gap-2'>
              <div className='w-[3%]'>
                <h1 className='text-center'>{i + 1}</h1>
              </div>
              <div className='w-[22%]'>
                <Link
                  to={`/book/${item.book._id}`}
                  className='hover:text-blue-500'
                >
                  <h1 className=''>{item.book.title}</h1>
                </Link>
              </div>
              <div className='w-[45%]'>
                <h1 className=''>{item.book.desc.slice(0, 50)}...</h1>
              </div>
              <div className='w-[9%]'>
                <h1 className=''>₹ {item.book.price}</h1>
              </div>
              <div className='w-[16%]'>
                <h1 className='font-semibold text-green-500'>
                  {item.status === 'Order Placed' ? (
                    <div className='text-yellow-500'>{item.status}</div>
                  ) : item.status === 'Cancelled' ? (
                    <div className='text-red-500'>{item.status}</div>
                  ) : (
                    item.status
                  )}
                </h1>
              </div>
              <div className='w-none md:w-[5%] hidden md:block'>
                <h1 className=''>COD</h1>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserOrderHistory;
