import React, {useEffect, useState} from 'react';
import {Outlet} from 'react-router-dom';
import {useSelector} from 'react-redux';
import axios from 'axios';
import Sidebar from '../components/Profile/Sidebar';
import Loader from '../components/Loader/Loader';
import MobileNav from '../components/Profile/MobileNav';

const Profile = () => {
  const [profile, setProfile] = useState({});

  const headers = {
    id: localStorage.getItem('id'),
    authorization: `Bearer ${localStorage.getItem('token')}`,
  };
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        '/api/v1/get-user-info',
        {headers}
      );
      setProfile(response.data);
    };
    fetch();
  }, []);
  return (
    <div className='bg-zinc-900 px-2 md:px-12 flex flex-col lg:flex-row h-[80%] py-8 text-white gap-4'>
      {!profile ? (
        <div className='w-full h-[100%] flex items-center justify-center'>
          <Loader />
        </div>
      ) : (
        <>
          <div className='w-full h-auto lg:h-screen  lg:w-1/6'>
            <Sidebar data={profile} />
            <MobileNav />
          </div>
          <div className='w-full md:w-5/6'>
            <Outlet />
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
