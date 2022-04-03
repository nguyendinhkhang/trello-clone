const jwt = require('jsonwebtoken')
const User = require('../models/User')
const ErrorHandler = require('../utils/ErrorHandler')

exports.authenticatorUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader?.startsWith('Bearer ')) return next(new ErrorHandler('Unauthenticated', 401))

    const token = authHeader.split(' ')[1]
    const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY)

    const user = await User.findById(decode._id)
    if (!user) return next(new ErrorHandler('User doesn\'t exists', 400))

    req.user = user

    next()
  } catch (error) {
    next(new ErrorHandler(error))
  }
}

exports.authorizorRole = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) return next(new ErrorHandler('You are not allowed to access this resource', 403))
    next()
  }
}

exports.verifyRefreshToken = async (req, res, next) => {
    token = req.cookies?.token
    if (!token) return next(new ErrorHandler('Please sign in to countinues', 401))

    const decode = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET_KEY)
    req.user_id = decode._id
    
    next()
}