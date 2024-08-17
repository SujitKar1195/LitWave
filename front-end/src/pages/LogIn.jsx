import {Link, useNavigate} from 'react-router-dom';
import {useState} from 'react';
import axios from '../api/axios';
import {authActions} from '../features/auth/authSlice';
import {useDispatch} from 'react-redux';
const LogIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: '',
    password: '',
  });

  const change = (e) => {
    const {name, value} = e.target;
    setValues({...values, [name]: value});
  };

  const submit = async () => {
    try {
      if (values.username === '' || values.password === '') {
        alert('All fields are required.');
        return;
      }
      const response = await axios.post('/api/v1/login', values);
      dispatch(authActions.login());
      dispatch(authActions.changeRole(response.data.role));
      localStorage.setItem('id', response.data.id);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('role', response.data.role);

      navigate('/profile');
    } catch (error) {
      alert(error.response.data.message);
    }
  };
  return (
    <div className='h-[85vh] bg-zinc-900 px-4 md:px-12 py-8 flex items-center justify-center'>
      <div className='bg-zinc-800 rounded-lg px-6 py-5 w-full sm:w-4/5 md:w-3/5 lg:w-2/5 xl:w-1/4'>
        <p className='text-zinc-200 text-lg md:text-xl lg:text-2xl'>Log In</p>
        <div className='mt-4'>
          <div>
            <label
              htmlFor='username'
              className='text-zinc-400'
            >
              Username
            </label>
            <input
              type='text'
              className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none rounded'
              placeholder='Username'
              name='username'
              value={values.username}
              onChange={change}
              required
            />
          </div>
        </div>

        <div className='mt-4'>
          <div>
            <label
              htmlFor='password'
              className='text-zinc-400'
            >
              Password
            </label>
            <input
              type='password'
              className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none rounded'
              placeholder='Password'
              name='password'
              value={values.password}
              onChange={change}
              required
            />
          </div>
        </div>

        <div className='mt-4'>
          <button
            className='select-none rounded-lg bg-blue-500 px-2 py-1 md:px-2 md:py-2 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none w-full'
            type='button'
            onClick={submit}
          >
            Log In
          </button>
        </div>
        <p className='flex mt-4 items-center justify-center text-zinc-200 font-semibold'>
          Or
        </p>
        <p className='flex mt-4 items-center justify-center text-zinc-500 font-semibold text-xs sm:text-sm'>
          Create an account? &nbsp;
          <Link
            to={'/signup'}
            className='hover:text-green-500 text-green-700'
          >
            <u>Sign Up</u>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LogIn;
