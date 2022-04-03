const validator = require('validator')
const ErrorHandler = require("../utils/ErrorHandler")

exports.validateDataCreateNewBoard = (req, res, next) => {
  if (!req.body.boardTitle)
    return next(new ErrorHandler('Please Enter Board Title', 400))
  if (!validator.isLength(req.body.boardTitle, { min: 1, max: 60 }))
    return next(new ErrorHandler('Board Title should be between 1 and 60 characters', 400))
  if (!req.body.background)
    return next(new ErrorHandler('Please Enter Background', 400))
  next()
}

exports.validateDataCreateNewList = (req, res, next) => {
  if (!req.body.listTitle) {
    return next(new ErrorHandler('Please Enter List Title', 400))
  } else {
    if (validator.isEmpty(req.body.listTitle) || !validator.isLength(req?.body?.listTitle, { min: 1, max: 210 })) {
      return next(new ErrorHandler('List Title should be between 1 and 210 characters', 400))
    }
  }
  if (!req.body.boardId)
    return next(new ErrorHandler('Please Enter Board ID', 400))
  if (!validator.isMongoId(req.body.boardId))
    return next(new ErrorHandler('Please Enter Valid Board ID', 400))
  next()
}

exports.validateDataCreateNewCard = (req, res, next) => {
  if (!req.body.cardTitle) {
    return next(new ErrorHandler('Please Enter Card Title', 400))
  } else {
    if (validator.isEmpty(req.body.cardTitle) || !validator.isLength(req?.body?.cardTitle, { min: 1, max: 210 })) {
      return next(new ErrorHandler('Board Title should be between 1 and 210 characters', 400))
    }
  }
  if (!req.body.listId)
    return next(new ErrorHandler('Please Enter List ID', 400))
  if (!validator.isMongoId(req.body.listId))
    return next(new ErrorHandler('Please Enter Valid List ID', 400))
  if (!req.body.boardId)
    return next(new ErrorHandler('Please Enter Board ID', 400))
  if (!validator.isMongoId(req.body.boardId))
    return next(new ErrorHandler('Please Enter Valid List ID', 400))
  next()
}

exports.validateDataUpdate = (req, res, next) => {
  if (Object.keys(req.body).length <= 0)
    return res.status(200).json({ success: true, message: 'Nothing Changes' })
  next()
}

exports.validateId = (req, res, next) => {
  if (!validator.isMongoId(req.params.id))
    return next(new ErrorHandler('Please Enter Valid ID', 400))
  next()
}

exports.validateSignUp = (req, res, next) => {
  if (!req.body.name)
    return next(new ErrorHandler('Please Enter Name', 400))
  if (!req.body.email)
    return next(new ErrorHandler('Please Enter Email', 400))
  if (!validator.isEmail(req.body.email))
    return next(new ErrorHandler('Invalid Email'))
  if (!req.body.username) {
    return next(new ErrorHandler('Please Enter Username', 400))
  }
  if (!req.body.password)
    return next(new ErrorHandler('Please Enter Password', 400))
  next()
}

exports.validateSignIn = (req, res, next) => {
  if (!req.body.username) {
    return next(new ErrorHandler('Please Enter Username', 400))
  }
  if (!req.body.password)
    return next(new ErrorHandler('Please Enter Password', 400))
  next()
}

exports.validateActivateEmail = (req, res, next) => {
  if (!req.body.activationToken) {
    return next(new ErrorHandler('Please Enter Activation Token', 400))
  }
  next()
}

exports.validateTokenId = (req, res, next) => {
  if (!req.body.tokenId) {
    return next(new ErrorHandler('Please Enter Token Id', 400))
  }
  next()
}

exports.validateDataSignInFacebook = (req, res, next) => {
  if (!req.body.accessToken) {
    return next(new ErrorHandler('Please Enter Access Token', 400))
  }
  if (!req.body.userID) {
    return next(new ErrorHandler('Please Enter User ID', 400))
  }
  next()
}

exports.validateForgotPassword = (req, res, next) => {
  if (!req.body.email)
    return next(new ErrorHandler('Please Enter Email', 400))
  if (!validator.isEmail(req.body.email))
    return next(new ErrorHandler('Invalid Email'))
  next()
}

exports.validateResetPassword = (req, res, next) => {
  if (!req.body.resetPasswordToken)
    return next(new ErrorHandler('Please Enter Reset Password Token', 400))
  if (!req.body.resetPassword)
    return next(new ErrorHandler('Please Enter Reset Password'))
  next()
}
