import axios from 'axios';
import {Link} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {FaCheck, FaUser} from 'react-icons/fa';
import {IoOpenOutline} from 'react-icons/io5';
import Loader from '../components/Loader/Loader';
import SeeUserData from './SeeUserData';

const AllOrders = () => {
  const [option, setOption] = useState(-1);
  const [values, setValues] = useState({status: ''});
  const [allOrders, setAllOrders] = useState();
  const [userDiv, setUserDiv] = useState('hidden');
  const [userDivData, setUserDivData] = useState();

  const headers = {
    id: localStorage.getItem('id'),
    authorization: `Bearer ${localStorage.getItem('token')}`,
  };
  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(
        'https://lit-wave.vercel.app/api/v1/get-all-orders',
        {
          headers,
        }
      );
      setAllOrders(res.data.data);
    };
    fetch();
  }, [allOrders]);

  const setOptionButton = (i) => {
    setOption(i);
  };
  const change = (e) => {
    const {value} = e.target;
    setValues({status: value});
  };
  const submitChanges = async (i) => {
    const id = allOrders[i]._id;
    const response = await axios.put(
      `https://lit-wave.vercel.app/api/v1/update-status/${id}`,
      values,
      {headers}
    );
    alert(response.data.message);
  };

  return (
    <>
      {!allOrders && (
        <div className='bg-zinc-900 flex items-center justify-center h-[100%]'>
          <Loader className='text-4xl' />
        </div>
      )}
      <div>
        {allOrders && allOrders.length > 0 && (
          <div className='h-[100%] p-0 md:p-4 text-zinc-100'>
            <div className='mt-4 bg-zinc-800 w-full  rounded py-2 px-4 flex gap-2'>
              <div className='w-[3%]'>
                <h1 className='text-center'>Sr.</h1>
              </div>
              <div className='w-[40%] md:w-[22%]'>
                <h1 className=''>Books</h1>
              </div>
              <div className='w-0 md:w-[45%]  hidden md:block'>
                <h1 className=''>Description</h1>
              </div>
              <div className='w-[17%] md:w-[9%]'>
                <h1 className=''>Price</h1>
              </div>
              <div className='w-[30%] md:w-[16%]'>
                <h1 className=''>Status</h1>
              </div>
              <div className='w-[10%] md:w-[5%]'>
                <h1 className=''>
                  <FaUser />
                </h1>
              </div>
            </div>
            {allOrders.map((item, i) => (
              <div
                key={i}
                className='mt-4 bg-zinc-800 w-full rounded py-2 px-4 flex gap-2  hover:bg-zinc-900'
              >
                <div className='w-[3%]'>
                  <h1 className='text-center'>{i + 1}</h1>
                </div>
                <div className='w-[40%] md:w-[22%] hover:cursor-pointer'>
                  <Link
                    to={`/book/${item.book._id}`}
                    className='hover:text-blue-500'
                  >
                    <h1 className=''>{item.book.title}</h1>
                  </Link>
                </div>
                <div className='w-0 md:w-[45%]  hidden md:block'>
                  <h1 className=''>{item.book.desc.slice(0, 50)}...</h1>
                </div>
                <div className='w-[17%] md:w-[9%]'>
                  <h1 className=''>₹ {item.book.price}</h1>
                </div>
                <div className='w-[30%] md:w-[16%]'>
                  <h1 className='font-semibold '>
                    <button
                      className='hover:scale-105 transition-all duration-300 hover:cursor-pointer'
                      onClick={() => setOptionButton(i)}
                    >
                      {item.status === 'Order Placed' ? (
                        <div className='text-yellow-500'>{item.status}</div>
                      ) : item.status === 'Cancelled' ? (
                        <div className='text-red-500'>{item.status}</div>
                      ) : (
                        <div className='text-green-500'>{item.status}</div>
                      )}
                    </button>
                    <div
                      className={`${
                        option === i ? 'block' : 'hidden'
                      } flex mt-4`}
                    >
                      <select
                        className='bg-gray-900 hover:bg-zinc-800 hover:cursor-pointer'
                        name='status'
                        id=''
                        onChange={change}
                        value={values.status}
                      >
                        {[
                          'Order Placed',
                          'Out for Delivery',
                          'Delivered',
                          'Cancelled',
                        ].map((item, i) => (
                          <option
                            value={item}
                            key={i}
                          >
                            {item}
                          </option>
                        ))}
                      </select>
                      <button
                        className='text-green-500 hover:text-pink-600 mx-2 hover:cursor-pointer'
                        onClick={() => {
                          setOption(-1);
                          submitChanges(i);
                        }}
                      >
                        <FaCheck />
                      </button>
                    </div>
                  </h1>
                </div>
                <div className='w-[10%] md:w-[5%] hover:cursor-pointer'>
                  <button
                    className='text-xl hover:text-orange-500'
                    onClick={() => {
                      setUserDiv('fixed');
                      setUserDivData(item.user);
                    }}
                  >
                    <IoOpenOutline />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {userDivData && (
        <SeeUserData
          userDivData={userDivData}
          userDiv={userDiv}
          setUserDiv={setUserDiv}
        />
      )}
    </>
  );
};

export default AllOrders;
