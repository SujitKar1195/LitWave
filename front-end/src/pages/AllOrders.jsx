import axios from 'axios';
import {useEffect} from 'react';

const AllOrders = () => {
  const headers = {
    id: localStorage.getItem('id'),
    authorization: `Bearer ${localStorage.getItem('token')}`,
  };
  //useEffect(() => {
  //  const fetch = async () => {
  //    const res = await axios.get(
  //      'http://localhost:8080/api/v1/get-all-orders',
  //      {
  //        headers,
  //      }
  //    );
  //    console.log(res.data.data);
  //  };
  //  fetch();
  //}, []);
  return <div>all orders</div>;
};

export default AllOrders;
