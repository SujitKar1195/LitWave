import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import Loader from '../components/Loader/Loader';
import {LiaCartArrowDownSolid} from 'react-icons/lia';
import {MdDelete} from 'react-icons/md';
const Cart = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState();
  const [total, setTotal] = useState(0);
  const headers = {
    id: localStorage.getItem('id'),
    authorization: `Bearer ${localStorage.getItem('token')}`,
  };
  useEffect(() => {
    const fetch = async () => {
<<<<<<< HEAD
      const res = await axios.get('/api/v1/get-cart-book', {headers});
=======
      const res = await axios.get(
        'https://lit-wave.vercel.app/api/v1/get-cart-book',
        {headers}
      );
>>>>>>> b8cfea23ed5eea38e72d8e30e2bb643b5b5ac7ca
      setCart(res.data.data);
    };
    fetch();
  }, [cart]);
  useEffect(() => {
    if (cart && cart.length > 0) {
      let totalPrice = 0;
      cart.map((item) => (totalPrice += item.price));
      setTotal(totalPrice);
      totalPrice = 0;
    }
  }, [cart]);

  const deleteItem = async (id) => {
    headers.bookid = id;
<<<<<<< HEAD
    const res = await axios.put('/api/v1/remove-book-from-cart', {}, {headers});
=======
    const res = await axios.put(
      'https://lit-wave.vercel.app/api/v1/remove-book-from-cart',
      {},
      {headers}
    );
>>>>>>> b8cfea23ed5eea38e72d8e30e2bb643b5b5ac7ca
    alert(res.data.message);
  };
  const placeOrder = async () => {
    try {
      const res = await axios.post(
<<<<<<< HEAD
        '/api/v1/place-order',
=======
        'https://lit-wave.vercel.app/api/v1/place-order',
>>>>>>> b8cfea23ed5eea38e72d8e30e2bb643b5b5ac7ca
        {
          order: cart,
        },
        {headers}
      );
      alert(res.data.message);
      navigate('/profile/orderHistory');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className='bg-zinc-900 px-8 py-4 h-screen'>
      {!cart && (
        <div className='bg-zinc-900 flex items-center justify-center h-[100%]'>
          <Loader className='text-4xl' />
        </div>
      )}
      {cart && cart.length === 0 && (
        <div className='h-screen'>
          <div className='h-[100%] flex items-center justify-center flex-col'>
            <h1 className='text-5xl  lg:text-6xl font-semibold text-zinc-400'>
              Empty Cart
            </h1>
            {/*<img
              src='https://media.istockphoto.com/id/861576608/vector/empty-shopping-bag-icon-online-business-vector-icon-template.jpg?s=612x612&w=0&k=20&c=I7MbHHcjhRH4Dy0NVpf4ZN4gn8FVDnwn99YdRW2x5k0='
              alt='empty cart'
              className='lg:h-[20vh] rounded mt-4'
            />*/}
            <LiaCartArrowDownSolid className='text-purple-700  text-2xl md:lg-4xl lg:text-8xl mt-4' />
          </div>
        </div>
      )}
      {cart && cart.length > 0 && (
        <>
          <h1 className='text-5xl text-zinc-400 mb-8 font-semibold '>
            Your Cart
          </h1>
          {cart.map((item, i) => (
            <div
              className='w-full my-4 rounded-md flex flex-col md:flex-row p-4 bg-zinc-800 justify-between items-center'
              key={i}
            >
              <img
                src={item.url}
                alt='/'
                className='h-[20vh] md:h-[10vh] object-cover'
              />
              <div className='w-full md:w-auto'>
                <h1 className='text-2xl text-zinc-100 font-semibold text-start mt-2 md:mt-0'>
                  {item.title}
                </h1>
                <p className='text-normal text-zinc-300 mt-2 hidden lg:block'>
                  {item.desc.slice(0, 100)}...
                </p>
                <p className='text-normal text-zinc-300 mt-2 hidden md:block lg:hidden'>
                  {item.desc.slice(0, 65)}...
                </p>
                <p className='text-normal text-zinc-300 mt-2 block md:hidden'>
                  {item.desc.slice(0, 100)}...
                </p>
              </div>
              <div className='flex mt-4 w-full md:w-auto items-center justify-between'>
                <h2 className='text-zinc-100 text-3xl font-semibold flex'>
                  ₹ {item.price}
                </h2>
                <button
                  className='bg-red-100 text-red-700 border-red-700 rounded p-2 ms-12'
                  onClick={() => deleteItem(item._id)}
                >
                  <MdDelete />
                </button>
              </div>
            </div>
          ))}
        </>
      )}

      {cart && cart.length > 0 && (
        <div className='mt-4 w-full flex items-center justify-end'>
          <div className='p-4 bg-zinc-800 rounded'>
            <h1 className='text-3xl text-zinc-200 font-semibold'>
              Total Amount
            </h1>
            <div className='mt-3 flex items-center justify-between text-xl text-zinc-200'>
              <h2>{cart.length} books</h2> <h2>₹ {total}</h2>
            </div>
            <div className='w-[100%] mt-3'>
              <button
                className='bg-zinc-100 rounded px-4  py-2 flex  justify-center w-full font-semibold hover:bg-zinc-300'
                onClick={placeOrder}
              >
                Place Your Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
