import {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
const SignUp = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
    address: '',
  });

  const change = (e) => {
    const {name, value} = e.target;
    setValues({...values, [name]: value});
  };

  const submit = async () => {
    try {
      if (
        values.username === '' ||
        values.email === '' ||
        values.password === '' ||
        values.address === ''
      ) {
        alert('All fields are required.');
        return;
      }

      const response = await axios.post(
        'https://lit-wave.vercel.app/api/v1/signup',
        values
      );
      navigate('/login');
    } catch (error) {
      console.log('error: ', error);
    }
  };

  return (
    <div className='h-auto bg-zinc-900 px-12 py-8 flex items-center justify-center'>
      <div className='bg-zinc-800 rounded-lg px-8 py-5 w-full md:w-3/6  lg:w-2/6'>
        <p className='text-zinc-200 text-xl'>Sign Up</p>
        <div className='mt-4'>
          <div>
            <label
              htmlFor=''
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
              htmlFor=''
              className='text-zinc-400'
            >
              Email
            </label>
            <input
              type='email'
              className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none rounded'
              placeholder='abc123@example.com'
              name='email'
              value={values.email}
              onChange={change}
              required
            />
          </div>
        </div>
        <div className='mt-4'>
          <div>
            <label
              htmlFor=''
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
          <div>
            <label
              htmlFor=''
              className='text-zinc-400'
            >
              Address
            </label>
            <textarea
              className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none rounded'
              placeholder='Address'
              name='address'
              value={values.address}
              onChange={change}
              required
            ></textarea>
          </div>
        </div>
        <div className='mt-4'>
          <button
            className='select-none rounded-lg bg-green-500 px-2 py-1 md:px-2 md:py-2 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-green-500/20 transition-all hover:shadow-lg hover:shadow-green-500/40 w-full'
            type='button'
            onClick={submit}
          >
            Sign Up
          </button>
        </div>
        <p className='flex mt-4 items-center justify-center text-zinc-200 font-semibold'>
          Or
        </p>
        <p className='flex mt-4 items-center justify-center text-zinc-500 font-semibold'>
          Already have an account? &nbsp;
          <Link
            to={'/login'}
            className='hover:text-blue-500 text-blue-700'
          >
            {' '}
            <u>Log In</u>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
