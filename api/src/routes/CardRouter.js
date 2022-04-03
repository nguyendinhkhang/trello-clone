const express = require('express')
const router = express.Router()
const { validateDataCreateNewCard, validateDataUpdate, validateId } = require('../middlewares/Validator')
const { getAllCard, createCard, updateCard, deleteCard, getCardDetail } = require('../controllers/CardController')
const { authenticatorUser, authorizorRole } = require('../middlewares/Authenticator')

router.route('/card')
  .get(getAllCard)
  .post(validateDataCreateNewCard, createCard)
router.route('/card/:id')
  .get(authenticatorUser, authorizorRole(100, 101), validateId, getCardDetail)
  .put(authenticatorUser, authorizorRole(100, 101), validateId, validateDataUpdate, updateCard)
  .delete(validateId, deleteCard)

module.exports = router