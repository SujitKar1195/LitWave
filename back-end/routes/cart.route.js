import express from 'express';
import User from '../models/users.model.js';
import authenticateToken from '../middlewares/usersAuth.auth.js';
const cartRouter = express.Router();

// put book to cart
cartRouter.put('/add-to-cart', authenticateToken, async (req, res) => {
  try {
    const {bookid, id} = req.headers;
    const userData = await User.findById(id);

    const isBookCarted = userData.cart.includes(bookid);

    if (isBookCarted) {
      return res
        .status(200)
        .json({status: 'success', message: 'Book is already in cart.'});
    }
    await User.findByIdAndUpdate(id, {
      $push: {cart: bookid},
    });
    return res
      .status(200)
      .json({status: 'success', message: 'Book is added to cart.'});
  } catch (error) {
    res.status(500).json({message: 'An error occured.'});
  }
});

// remove book from cart
cartRouter.put(
  '/remove-book-from-cart',
  authenticateToken,
  async (req, res) => {
    try {
      const {bookid, id} = req.headers;
      const userData = await User.findById(id);
      //console.log(userData)
      const isBookFavourited = userData.cart.includes(bookid);
      if (isBookFavourited) {
        await User.findByIdAndUpdate(
          {_id: id},
          {$pull: {cart: bookid}},
          {safe: true, multi: false}
        );
        return res.status(200).json({message: 'Book removed from cart.'});
      } else
        return res.status(200).json({message: 'Book is not present in cart.'});
    } catch (error) {
      return res.status(500).json({message: 'An error occured.'});
    }
  }
);

// get cart books of a particular user
cartRouter.get('/get-cart-book', authenticateToken, async (req, res) => {
  try {
    const {id} = req.headers;
    const userData = await User.findById(id).populate('cart');
    const cartedBook = userData.cart.reverse();
    return res.status(200).json({
      status: 'success',
      data: cartedBook,
    });
  } catch (error) {
    return res.status(500).json({message: 'An error occured.'});
  }
});

export default cartRouter;
