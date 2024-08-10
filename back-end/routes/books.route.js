import User from '../models/users.model.js';
import Book from '../models/books.model.js';
import authenticateToken from '../middlewares/usersAuth.auth.js';
import express from 'express';
const bookRouter = express.Router();

// add-book admin
bookRouter.post('/add-book', authenticateToken, async (req, res) => {
  try {
    const {id} = req.headers;
    const user = await User.findById(id);
    //console.log(user);
    if (user.role !== 'admin') {
      return res.status(400).json({
        message:
          'You do not have the necessary permissions to perform this action!',
      });
    }
    //console.log(req.body);
    const book = new Book({
      url: req.body.url,
      title: req.body.title,
      author: req.body.author,
      price: req.body.price,
      desc: req.body.desc,
      language: req.body.language,
    });
    await book.save();
    return res.status(200).json({message: 'Book added successfully.'});
  } catch (err) {
    return res.status(500).json({message: `An error has occured.`});
  }
});

// update book admin
bookRouter.put('/update-book', authenticateToken, async (req, res) => {
  try {
    const {bookid} = req.headers;
    await Book.findByIdAndUpdate(bookid, {
      url: req.body.url,
      title: req.body.title,
      author: req.body.author,
      price: req.body.price,
      desc: req.body.desc,
      language: req.body.language,
    });

    return res.status(200).json({message: 'Book updated successfully!'});
  } catch (err) {
    return res.status(500).json({message: `An error has occured.`});
  }
});

// delete book admin
bookRouter.delete('/delete-book', authenticateToken, async (req, res) => {
  try {
    const {bookid} = req.headers;
    await Book.findByIdAndDelete(bookid);

    return res.status(200).json({message: 'Book deleted successfully!'});
  } catch (err) {
    return res.status(500).json({message: `An error has occured.`});
  }
});

// get all books
bookRouter.get('/get-all-books', async (req, res) => {
  try {
    const books = await Book.find().sort({createdAt: -1});
    return res.json({
      status: 'success',
      data: books,
    });
  } catch (error) {
    return res.status(500).json({message: `An error has occured.`});
  }
});

// get recent 4 books
bookRouter.get('/get-recent-books', async (req, res) => {
  try {
    const books = await Book.find().sort({createdAt: -1}).limit(4);
    return res.json({
      status: 'success',
      data: books,
    });
  } catch (error) {
    return res.status(500).json({message: `An error has occured.`});
  }
});

//get book by id
bookRouter.get('/get-book/:id', async (req, res) => {

  try {
    const {id} = req.params;
    const book = await Book.findById(id);
    return res.json({
      status: 'success',
      data: book,
    });
  } catch (error) {
    return res.status(500).json({message: `An error has occured.`});
  }
});
export default bookRouter;
