const express = require('express')
const router = express.Router()
const { validateDataCreateNewBoard, validateDataUpdate, validateId } = require('../middlewares/Validator')
const {
  getAllBoard,
  getMyBoard,
  getDetailBoard,
  createBoard,
  updateBoard,
  deleteMyBoard
} = require('../controllers/BoardController')
const { authenticatorUser, authorizorRole } = require('../middlewares/Authenticator')

router.route('/board')
  .get(getAllBoard)
router.route('/my-board')
  .get(authenticatorUser, authorizorRole(100, 101), getMyBoard)
  .post(authenticatorUser, authorizorRole(100, 101), validateDataCreateNewBoard, createBoard)
router.route('/board/:id')
  .get(authenticatorUser, authorizorRole(100, 101), validateId, getDetailBoard)
  .put(authenticatorUser, authorizorRole(100, 101), validateId, validateDataUpdate, updateBoard)
  .delete(authenticatorUser, authorizorRole(100, 101), validateId, deleteMyBoard)

module.exports = router