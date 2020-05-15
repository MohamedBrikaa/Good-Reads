const express = require('express')
const BookModel = require('../models/book')
const multer = require('multer')
const { v4: uuidv4 } = require('uuid');
const router = express.Router()
const ReviewModel = require('../models/review');
const upload = require('../middlewares/book')
/** MiddleWares */



/** APIs */
router.post('/', upload.single('bookImage'), async (req, res) => {
    console.log("Before Add Book To DB");
    const book = new BookModel({
        name: req.body.name,
        category: req.body.categoryId,
        author: req.body.authorId,
        bookImage: req.file.path
    });
    try {
        const savedBook = await book.save();
        const savedBookDetails =  await BookModel.findById({ _id:savedBook._id }).populate('category').populate('author')
        res.json(savedBookDetails);
    } catch (err) {
        console.log(err);
        res.json(err);
    }
})

router.get('/', async (req, res) => {
    console.log("Get All Book");
    // BookModel.remove({},()=>{})
    try {
        const books = await BookModel.find().populate('category').populate('author')
        res.json(books)
    } catch (err) {
        console.log(err);
        res.json(err)
    }
})

router.get('/:id', async (req, res) => {
    const id = req.params.id
    console.log("Get A Book");
    try {
        const book = await BookModel.findById({ _id:id }).populate('category').populate('author')
        // const bookReviews = await ReviewModel.find({ book:id }).populate('usersModel')
        res.json(book)
    } catch (err) {
        console.log(err);
        res.json(err)
    }
})


router.delete('/:id', async (req, res) => {
    const id = req.params.id
    console.log("delete book");
    try {
        const deletedState = await BookModel.deleteOne({ _id: id })
        res.json(deletedState);
    }
    catch (err) {
        console.log(err);
        res.json(err)
    }
})

router.patch('/:id', upload.single('bookImage'),async (req, res) => {
    const id = req.params.id;
    const newBookData = {
        name: req.body.name,
        category: req.body.categoryId,
        author: req.body.authorId,
        bookImage: req.file ? req.file.path : (await BookModel.findById(id).select('bookImage -_id')).bookImage
      }
    console.log("edit book");
    try {
        const updatedBook = await BookModel.findOneAndUpdate({ _id: id }, newBookData, { new: true }).populate('category').populate('author')
        res.json(updatedBook)
    } catch (err) {
        res.json({
            code: 'DB_ERROR'
        })
    }
})

module.exports = router
