import React from 'react';
import {RxCross1} from 'react-icons/rx';
const SeeUserData = ({userDivData, userDiv, setUserDiv}) => {
  return (
    <>
      <div
        className={`${userDiv} top-0 left-0 h-screen w-full bg-zinc-800 opacity-80`}
      ></div>{' '}
      <div
        className={`${userDiv} top-0 left-0 h-screen w-full flex justify-center items-center `}
      >
        <div className='bg-white text-zinc-900 rounded p-4 w-[80%]  md:w-[50%] lg:w-[40%]'>
          <div className='flex justify-between items-center'>
            <h1 className='text-2xl font-semibold '>User Information</h1>
            <button onClick={() => setUserDiv('hidden')}>
              <RxCross1 />
            </button>
          </div>
          <div className='mt-2'>
            <label htmlFor=''>Username: </label>
            <span className='font-semibold'>{userDivData.username}</span>
          </div>
          <div className='mt-4'>
            <label htmlFor=''>Email: </label>
            <span className='font-semibold'>{userDivData.email}</span>
          </div>
          <div className='mt-4'>
            <label htmlFor=''>Address: </label>
            <span className='font-semibold'>{userDivData.address}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default SeeUserData;
