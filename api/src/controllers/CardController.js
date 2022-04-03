const Board = require('../models/Board')
const List = require('../models/List')
const Card = require('../models/Card')
const ErrorHandler = require('../utils/ErrorHandler')
const cloudinary = require('cloudinary')

exports.getAllCard = async (req, res, next) => {
  try {
    const cards = await Card.find()
    res.status(200).json({ success: true, cards })
  } catch (error) {
    next(new ErrorHandler(error.message))
  }
}

exports.getCardDetail = async (req, res, next) => {
  try {
    const card = await Card.findById(req.params.id).populate({ path: 'listId', select: 'listTitle' })
    if (!card) return next(new ErrorHandler(`Card ${req.params.id} Does Not Exist`, 400))
    res.status(200).json({ success: true, card })
  } catch (error) {
    next(new ErrorHandler(error.message))
  }
}

exports.createCard = async (req, res, next) => {
  try {
    const list = await List.findById(req.body.listId)
    if (!list) return next(new ErrorHandler(`List ${req.body.listId} Does Not Exist`, 400))

    const board = await Board.findById(req.body.boardId)
    if (!board) return next(new ErrorHandler(`Board ${req.body.boardId} Does Not Exist`, 400))

    const newCard = await Card.create(req.body)

    list.cardOrder.push(newCard._id)
    await list.save()

    res.status(201).json({ success: true, newCard })
  } catch (error) {
    next(new ErrorHandler(error.message))
  }
}

exports.updateCard = async (req, res, next) => {
  try {
    const cardUpdate = await Card.findById(req.params.id)
    if (!cardUpdate) return next(new ErrorHandler(`Card ${req.params.id} Does Not Exist`, 400))

    if (req.body.coverImage) {
      if (cardUpdate.coverImage.public_id) await cloudinary.v2.uploader.destroy(cardUpdate.coverImage.public_id)
      const myCloud = await cloudinary.v2.uploader.upload(req.body.coverImage, {
        folder: 'Trello-Clone/Card-CoverImage',
        width: 259,
        crop: 'scale'
      })
      const coverImageUpdate = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url
      }
      const cardUpdated = await Card.findByIdAndUpdate(
        { _id: req.params.id },
        { coverImage: coverImageUpdate },
        { returnDocument: 'after', runValidators: true }
      ).populate({ path: 'listId', select: 'listTitle' })
      res.status(200).json({ success: true, message: 'Card Has Been Updated', cardUpdated })
    } else {
      const cardUpdated = await Card.findByIdAndUpdate(
        { _id: req.params.id }, req.body,
        { returnDocument: 'after', runValidators: true }
      )
      res.status(200).json({ success: true, message: 'Card Has Been Updated', cardUpdated })
    }

  } catch (error) {
    next(new ErrorHandler(error.message))
  }
}

exports.deleteCard = async (req, res, next) => {
  try {
    const cardDelete = await Card.findById(req.params.id)
    if (!cardDelete) return next(new ErrorHandler(`Card ${req.params.id} Does Not Exist`, 400))

    await cardDelete.remove()

    res.status(200).json({ success: true, message: `List '${cardDelete.cardTitle}' Has Been Deleted` })
  } catch (error) {
    next(new ErrorHandler(error.message))
  }
}