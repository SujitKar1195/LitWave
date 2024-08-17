import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Loader from '../Loader/Loader';
const Settings = () => {
  const [Value, setValue] = useState({address: ''});
  const [profileData, setProfileData] = useState({
    username: '',
    email: '',
    address: '',
  });
  const headers = {
    id: localStorage.getItem('id'),
    authorization: `Bearer ${localStorage.getItem('token')}`,
  };
  const change = (e) => {
    const {name, value} = e.target;
    setValue({...Value, [name]: value});
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        '/api/v1/get-user-info',
        {headers}
      );
      setProfileData(response.data);
      setValue({address: response.data.address});
    };
    fetch();
  }, []);

  const handleUpdate = async () => {
    const res = await axios.put(
      '/api/v1/update-address',
      Value,
      {
        headers,
      }
    );
    alert(res.data.message);
  };
  return (
    <div className='bg-zinc-900 px-2 md:px-12 flex flex-col md:flex-row py-8 gap-4 text-white'>
      {!profileData && (
        <div className='bg-zinc-900 flex items-center justify-center h-[100%]'>
          <Loader className='text-4xl' />
        </div>
      )}
      {profileData && (
        <div className='h-[100%] p-0 md:p-4 text-zinc-100'>
          <h1 className='text-3xl md:text-5xl font-semibold text-zinc-500 mb-8'>
            Settings
          </h1>
          <div className='flex gap-12'>
            <div className=''>
              <label htmlFor=''>Username</label>
              <p className='p-2 rounded-md bg-zinc-800  mt-2 font-semibold'>
                {profileData.username}
              </p>
            </div>
            <div className=''>
              <label htmlFor=''>Email</label>
              <p className='p-2 rounded-md bg-zinc-800  mt-2 font-semibold'>
                {profileData.email}
              </p>
            </div>
          </div>
          <div className='mt-4 flex flex-col'>
            <label htmlFor=''>Address</label>
            <textarea
              className='p-2 rounded bg-zinc-800 mt-2 font-semibold'
              rows={5}
              name='address'
              placeholder='Address'
              value={Value.address}
              onChange={change}
            />
          </div>
          <div className='mt-4 flex justify-end'>
            <button
              className='bg-yellow-500 text-zinc-900 font-semibold px-3 py-2 rounded hover:bg-yellow-400'
              onClick={handleUpdate}
            >
              Update
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
