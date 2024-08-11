import {Link, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {authActions} from '../../features/auth/authSlice';
const Sidebar = ({data}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);

  return (
    <div className='bg-zinc-800 p-4 rounded-md flex flex-col items-center justify-center h-auto lg:h-[100%]'>
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

      {role === 'user' && (
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
      )}
      {role === 'admin' && (
        <div className='w-full flex flex-col items-center justify-center'>
          <Link
            to={'/profile'}
            className='text-zinc-100 font-semibold w-full py-2  text-center  hover:bg-zinc-900 rounded-md transition-all duration-200'
          >
            All Orders
          </Link>
          <Link
            to={'/profile/add-book'}
            className='text-zinc-100 font-semibold w-full py-2  text-center  hover:bg-zinc-900 rounded-md transition-all duration-200'
          >
            Add Book
          </Link>
        </div>
      )}

      <button
        className='w-full mt-4 font-semibold  text-red-500 transition-all duration-300 bg-zinc-900 py-3 rounded-md hover:bg-red-700 hover:text-white'
        onClick={() => {
          dispatch(authActions.logout());
          dispatch(authActions.changeRole('user'));
          localStorage.clear();
          navigate('/');
        }}
      >
        Log Out
      </button>
    </div>
  );
};

export default Sidebar;
