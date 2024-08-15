import authenticateToken from '../middlewares/usersAuth.auth.js';

import Order from '../models/orders.model.js';
import User from '../models/users.model.js';
import express from 'express';

const orderRouter = express.Router();

// place-order
orderRouter.post('/place-order', authenticateToken, async (req, res) => {
  try {
    const {id} = req.headers;
    const {order} = req.body;
    for (const orderData of order) {
      const newOrder = new Order({user: id, book: orderData._id});
      const orderDataFromDB = await newOrder.save();
      // saving order in user model
      await User.findByIdAndUpdate(id, {
        $push: {orders: orderDataFromDB._id},
      });
      // clearing cart
      await User.findByIdAndUpdate(id, {
        $pull: {cart: orderData._id},
      });
    }

    return res
      .status(200)
      .json({status: 'success', message: 'Order placed successfully.'});
    
  } catch (error) {
    return res.status(500).json({message: 'An error occured.'});
  }
});

// get order history of a particular user
orderRouter.get('/get-order-history', authenticateToken, async (req, res) => {
  try {
    const {id} = req.headers;
    const userData = await User.findById(id).populate({
      path: 'orders',
      populate: {path: 'book'},
    });
    const orderData = userData.orders.reverse();
    return res.status(200).json({status: 'success', data: orderData});
  } catch (error) {
    return res.status(500).json({message: 'An error occured.'});
  }
});

// get all orders --admin
orderRouter.get('/get-all-orders', authenticateToken, async (req, res) => {
  try {
    
    const userData = await Order.find()
      .populate({path: 'book'})
      .populate({path: 'user'})
      .sort({createdAt: -1});
    return res.status(200).json({status: 'success', data: userData});
  } catch (error) {
    return res.status(500).json({message: 'An error occured.'});
  }
});

// update order status--admin
orderRouter.put('/update-status/:id', authenticateToken, async (req, res) => {
  const {id} = req.params;
  await Order.findByIdAndUpdate(id, {status: req.body.status});
  return res
    .status(200)
    .json({status: 'success', message: 'Status updated successfully.'});
});
export default orderRouter;
