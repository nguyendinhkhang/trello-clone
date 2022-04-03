const ErrorHandler = require('../utils/ErrorHandler')
const List = require('../models/List')
const Board = require('../models/Board')

exports.getAllList = async (req, res, next) => {
  try {
    const lists = await List.find()
    res.status(200).json({ success: true, lists })
  } catch (error) {
    next(new ErrorHandler(error.message))
  }
}

exports.createList = async (req, res, next) => {
  try {
    const board = await Board.findById(req.body.boardId)
    if (!board) return next(new ErrorHandler(`Board ${req.body.boardId} Does Not Exist`, 400))
    
    const newList = await List.create(req.body)
    
    board.listOrder.push(newList._id)
    await board.save()

    res.status(201).json({ success: true, newList })
  } catch (error) {
    next(new ErrorHandler(error.message))
  }
}

exports.updateList = async (req, res, next) => {
  try {
    let listUpdate = await List.findById(req.params.id)
    if (!listUpdate) return next(new ErrorHandler(`List ${req.params.id} Does Not Exist`, 400))

    const listUpdated = await List.findByIdAndUpdate(req.params.id, req.body, { returnDocument: 'after', runValidators: true })
    res.status(200).json({ success: true, message: 'List Has Been Updated', listUpdated })
  } catch (error) {
    next(new ErrorHandler(error.message))
  }
}

exports.deleteList = async (req, res, next) => {
  try {
    const listDelete = await List.findById(req.params.id)
    if (!listDelete) return next(new ErrorHandler(`List ${req.params.id} Does Not Exist`, 400))

    await listDelete.remove()

    res.status(200).json({ success: true, message: `List '${listDelete.listTitle}' Has Been Deleted` })
  } catch (error) {
    next(new ErrorHandler(error.message))
  }
}