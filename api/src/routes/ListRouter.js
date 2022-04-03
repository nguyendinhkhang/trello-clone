const express = require('express')
const router = express.Router()
const { validateDataCreateNewList, validateDataUpdate, validateId } = require('../middlewares/Validator')
const { getAllList, createList, updateList, deleteList } = require('../controllers/ListController')
const { authenticatorUser, authorizorRole } = require('../middlewares/Authenticator')

router.route('/list')
  .get(getAllList)
  .post(authenticatorUser, authorizorRole(100, 101), validateDataCreateNewList, createList)
router.route('/list/:id')
  .put(authenticatorUser, authorizorRole(100, 101), validateId, validateDataUpdate, updateList)
  .delete(authenticatorUser, authorizorRole(100, 101), validateId, deleteList)

module.exports = router