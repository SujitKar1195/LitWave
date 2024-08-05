import express from 'express';
import User from '../models/users.model.js';
import authenticateToken from '../middlewares/usersAuth.auth.js';
const favouriteRouter = express.Router();

// add book to favourites
favouriteRouter.put(
  '/add-book-to-favourites',
  authenticateToken,
  async (req, res) => {
    try {
      const {bookid, id} = req.headers;
      const userData = await User.findById(id);
      const isBookFavourited = userData.favourites.includes(bookid);
      if (isBookFavourited) {
        return res
          .status(200)
          .json({message: 'Book is already in favourites.'});
      }
      await User.findByIdAndUpdate(id, {
        $push: {favourites: bookid},
      });
      return res.status(200).json({message: 'Book added to favourites.'});
    } catch (error) {
      res.status(500).json({message: 'Internal server error.'});
    }
  }
);
// remove book from favourites
favouriteRouter.delete(
  '/remove-book-from-favourites',
  authenticateToken,
  async (req, res) => {
    try {
      const {bookid, id} = req.headers;
      const userData = await User.findById(id);
      //console.log(userData)
      const isBookFavourited = userData.favourites.includes(bookid);
      if (isBookFavourited) {
        await User.findByIdAndUpdate(
          {_id: id},
          {$pull: {favourites: bookid}},
          {safe: true, multi: false}
        );
        return res.status(200).json({message: 'Book removed from favourites.'});
      } else
        return res
          .status(200)
          .json({message: 'Book is not present in favourites.'});
    } catch (error) {
      res.status(500).json({message: 'Internal server error.'});
    }
  }
);
// get favourites book of a particular user
favouriteRouter.get(
  '/get-favourites-book',
  authenticateToken,
  async (req, res) => {
    try {
      const {id} = req.headers;
      const userData = await User.findById(id).populate('favourites');
      console.log(userData);
      const favouritesBook = userData.favourites;
      return res.status(200).json({
        status: 'success',
        data: favouritesBook,
      });
    } catch (error) {
      res.status(500).json({message: 'Internal server error.'});
    }
  }
);

export default favouriteRouter;
