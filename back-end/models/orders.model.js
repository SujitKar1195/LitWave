import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'books',
      required: true,
    },
    status: {
      type: String,
      enum: ['Order Placed', 'Out for Delivery', 'Delivered', 'Cancelled'],
      default: 'Order Placed',
    },
  },
  {timestamps: true}
);

const Order = mongoose.model('orders', orderSchema);
module.exports = Order;
