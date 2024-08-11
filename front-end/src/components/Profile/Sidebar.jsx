import {Link} from 'react-router-dom';
import {IoLogOutOutline} from 'react-icons/io5';
const Sidebar = ({data}) => {
  return (
    <div className='bg-zinc-800 p-4 rounded-md flex flex-col items-center justify-between h-[90%]'>
      <div className='flex items-center justify-center flex-col'>
        <img
          src={data.avatar}
          alt='avatar'
          className='h-[8vh]'
        />
        <p className='mt-3 text-xl  text-zinc-100 font-semibold'>
          {data.username}
        </p>
        <p className='mt-1 text-normal  text-blue-400'>{data.email}</p>
        <div className='w-full  mt-4 h-[1px] bg-zinc-500 hidden lg:block'></div>
      </div>
      <div>
        <div className='w-full flex flex-col items-center justify-center'>
          <Link
            to={'/profile'}
            className='text-zinc-100 font-semibold w-full py-2  text-center  hover:bg-zinc-900 rounded-md transition-all duration-200'
          >
            Favourites
          </Link>
          <Link
            to={'/profile/orderHistory'}
            className='text-zinc-100 font-semibold w-full py-2  text-center  hover:bg-zinc-900 rounded-md transition-all duration-200'
          >
            Order History
          </Link>
          <Link
            to={'/profile/settings'}
            className='text-zinc-100 font-semibold w-full py-2  text-center  hover:bg-zinc-900 rounded-md transition-all duration-200'
          >
            Settings
          </Link>
        </div>
      </div>
      <button className='w-3/6 lg:w-full mt-4 lg:mt-0  font-semibold flex flex-col items-center justify-center text-red-500 transition-all duration-300 bg-zinc-900 py-3 rounded-md hover:bg-red-700 hover:text-white'>
        Log Out
        <IoLogOutOutline className='ms-4 text-3xl ' />
      </button>
    </div>
  );
};

export default Sidebar;
