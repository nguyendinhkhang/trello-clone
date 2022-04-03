const { ObjectId } = require('mongoose').Types
const Board = require('../models/Board')
const List = require('../models/List')
const ErrorHandler = require('../utils/ErrorHandler')

exports.getAllBoard = async (req, res, next) => {
  try {
    const boards = await Board.find()
    res.status(200).json({ success: true, boards })
  } catch (error) {
    next(new ErrorHandler(error.message))
  }
}

exports.getMyBoard = async (req, res, next) => {
  try {
    const myBoards = await Board.find({ userId: req.user._id }).sort({ createdAt: -1 })
    res.status(200).json({ success: true, myBoards })
  } catch (error) {
    next(new ErrorHandler(error.message))
  }
}

exports.getDetailBoard = async (req, res, next) => {
  try {
    const board = await Board.aggregate([
      {
        $match: { _id: ObjectId(req.params.id), userId: ObjectId(req.user._id) }
      },
      {
        $lookup: {
          from: 'lists',
          localField: '_id',
          foreignField: 'boardId',
          as: 'lists'
        }
      },
      {
        $lookup: {
          from: 'cards',
          localField: '_id',
          foreignField: 'boardId',
          as: 'cards'
        }
      }
    ])
    if (board.length <= 0) return next(new ErrorHandler(`Board ${req.params.id} Does Not Exist`, 400))

    board[0].lists.forEach(list => {
      list.cards = board[0].cards.filter(card => card.listId.toString() === list._id.toString())
    })

    delete board[0].cards

    res.status(200).json({ success: true, board: board[0] })
  } catch (error) {
    next(new ErrorHandler(error.message))
  }
}

exports.createBoard = async (req, res, next) => {
  try {
    const newBoard = await Board.create({
      boardTitle: req.body.boardTitle,
      background: req.body.background,
      userId: req.user._id
    })
    res.status(201).json({ success: true, newBoard })
  } catch (error) {
    next(new ErrorHandler(error.message))
  }
}

exports.updateBoard = async (req, res, next) => {
  try {
    let boardUpdate = await Board.findById(req.params.id)
    if (!boardUpdate) return next(new ErrorHandler(`Board ${req.params.id} Does Not Exist`, 400))

    if (!boardUpdate.userId.includes(req.user._id)) return next(new ErrorHandler(`You can\'t delete this board`, 400))

    const boardUpdated = await Board.findByIdAndUpdate(req.params.id, req.body, { returnDocument: 'after', runValidators: true })
    res.status(200).json({ success: true, message: 'Board Has Been Updated', boardUpdated })
  } catch (error) {
    next(new ErrorHandler(error.message))
  }
}

exports.deleteMyBoard = async (req, res, next) => {
  try {
    let boardDelete = await Board.findById(req.params.id)
    if (!boardDelete) return next(new ErrorHandler(`Board ${req.params.id} Does Not Exist`, 400))

    if (!boardDelete.userId.includes(req.user._id)) return next(new ErrorHandler(`You can\'t delete this board`, 400))

    await boardDelete.remove()

    res.status(200).json({ success: true, message: `Board '${boardDelete.boardTitle}' Has Been Deleted` })
  } catch (error) {
    next(new ErrorHandler(error.message))
  }
}