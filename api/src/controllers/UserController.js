const User = require('../models/User')
const ErrorHandler = require('../utils/ErrorHandler')
const jwt = require('jsonwebtoken')
const fetch = require('node-fetch')
const sendEmail = require('../utils/SendEmail')
const { google } = require('googleapis')
const OAuth2 = google.auth.OAuth2

const oauth2Client = new OAuth2(process.env.GOOGLE_OAUTH2_CLIENT_ID)


exports.signUpEmailActivation = async (req, res, next) => {
  try {
    const emailSignUp = await User.findOne({ email: req.body.email })
    if (emailSignUp) return next(new ErrorHandler('Email already exists', 400))
    const usernameSignUp = await User.findOne({ username: req.body.username })
    if (usernameSignUp) return next(new ErrorHandler('Username already exists', 400))

    const activationToken = jwt.sign(
      req.body,
      process.env.ACTIVATION_TOKEN_SECRET_KEY,
      { expiresIn: process.env.ACTIVATION_TOKEN_EXPIRE }
    )

    let url
    if (process.env.NODE_ENV !== 'PRODUCTION') {
      url = `http://localhost:3000/account/activate/${activationToken}`
    } else {
      url = `https://hitrello.netlify.app/account/activate/${resetToken}`
    }

    await sendEmail({
      name: req.body.name,
      email: req.body.email,
      subject: '🔐 Activation Account | Trello',
      titleEmail: 'Verify your email to finish signing up',
      url,
      action: 'Verify my email'
    })

    res.status(201).json({ success: true, message: 'Sign up successfully. Please check your email to activate account' })
  } catch (error) {
    next(new ErrorHandler(error.message))
  }
}

exports.activateEmail = async (req, res, next) => {
  try {
    const newUser = jwt.verify(req.body.activationToken, process.env.ACTIVATION_TOKEN_SECRET_KEY)
    const user = await User.create(newUser)

    const accessToken = jwt.sign(
      { _id: user._id },
      process.env.ACCESS_TOKEN_SECRET_KEY,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRE }
    )
    const refreshToken = jwt.sign(
      { _id: user._id },
      process.env.REFRESH_TOKEN_SECRET_KEY,
      { expiresIn: process.env.REFRESH_TOKEN_EXPIRE }
    )

    user.refreshToken = refreshToken
    await user.save()

    const userInfo = {
      _id: user._id,
      name: user.name,
      email: user.email,
      username: user.username,
      avatar: user.avatar,
    }

    res.status(201)
      .cookie('token', refreshToken, {
        httpOnly: false,
        samSite: 'None',
        secure: true,
        maxAge: process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      })
      .json({ success: true, message: `User ${user.username} sign up successfully`, userInfo, role: user.role, accessToken })
  } catch (error) {
    next(new ErrorHandler(error.message))
  }
}

exports.signIn = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username }).select('+password')
    if (!user) return next(new ErrorHandler('Username or password incorrect', 400))

    const isPasswordMatch = await user.comparePassword(req.body.password)
    if (!isPasswordMatch) return next(new ErrorHandler('Username or password incorrect', 400))

    const accessToken = jwt.sign(
      { _id: user._id },
      process.env.ACCESS_TOKEN_SECRET_KEY,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRE }
    )
    const refreshToken = jwt.sign(
      { _id: user._id },
      process.env.REFRESH_TOKEN_SECRET_KEY,
      { expiresIn: process.env.REFRESH_TOKEN_EXPIRE }
    )

    user.refreshToken = refreshToken
    await user.save()

    const userInfo = {
      _id: user._id,
      name: user.name,
      email: user.email,
      username: user.username,
      avatar: user.avatar,
    }

    res.status(200).cookie('token', refreshToken, {
      httpOnly: false,
      samSite: 'None',
      secure: true,
      maxAge: process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    }).json({ success: true, userInfo, role: user.role, accessToken })
  } catch (error) {
    next(new ErrorHandler(error.message))
  }
}

exports.forgotPassword = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email })
    if (!user) return next(new ErrorHandler('No accounts were found that match this email address', 400))
    if (user.accountType !== 'Trello') return next(new ErrorHandler(`This email is sign in with ${user.accountType} so it is not possible to reset the password`, 400))
    const resetPasswordToken = jwt.sign(
      { _id: user._id, email: user.email, username: user.username },
      process.env.RESETPASSWORD_TOKEN_SECRET_KEY,
      { expiresIn: process.env.ACTIVATION_TOKEN_EXPIRE }
    )
    let url
    if (process.env.NODE_ENV !== 'PRODUCTION') {
      url = `http://localhost:3000/account/reset-password/${resetPasswordToken}`
    } else {
      url = `${req.protocol}://${req.get('host')}/account/reset-password/${resetPasswordToken}`
    }

    await sendEmail({
      name: user.name,
      email: user.email,
      subject: '🔐 Reset Password | Trello',
      titleEmail: 'Reset Your Password',
      url,
      action: 'Reset my password'
    })

    res.status(200).json({ success: true, message: 'We have sent a password reset email to your email address. Please check your email to reset password' })
  } catch (error) {
    next(new ErrorHandler(error.message))
  }
}

exports.resetPassword = async (req, res, next) => {
  try {
    const dataResetPassword = jwt.verify(req.body.resetPasswordToken, process.env.RESETPASSWORD_TOKEN_SECRET_KEY)
    const user = await User.findOne({ _id: dataResetPassword._id })
    if (!user) return next(new ErrorHandler('User doesn\'t exists', 400))

    user.password = req.body.resetPassword
    await user.save()

    res.status(200).json({ success: true, message: 'Your password has been reset' })
  } catch (error) {
    next(new ErrorHandler(error.message))
  }
}

exports.refreshToken = async (req, res, next) => {
  try {
    const user = await User.findById(req.user_id)
    if (!user) return next(new ErrorHandler('User doesn\'t exists', 400))

    const cookies = req.cookies
    if (!cookies?.token) return next(new ErrorHandler('Token can\'t not found', 403))

    const decode = jwt.verify(cookies.token, process.env.REFRESH_TOKEN_SECRET_KEY)
    if (decode._id.toString() !== user._id.toString()) return next(new ErrorHandler('Invalid token', 403))

    const accessToken = jwt.sign(
      { _id: user._id },
      process.env.ACCESS_TOKEN_SECRET_KEY,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRE }
    )

    res.status(200).json({ success: true, accessToken })
  } catch (error) {
    next(new ErrorHandler(error.message))
  }
}

exports.getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.user_id)
    if (!user) return next(new ErrorHandler('User doesn\'t exists', 400))

    const accessToken = jwt.sign(
      { _id: user._id },
      process.env.ACCESS_TOKEN_SECRET_KEY,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRE }
    )
    const refreshToken = jwt.sign(
      { _id: user._id },
      process.env.REFRESH_TOKEN_SECRET_KEY,
      { expiresIn: process.env.REFRESH_TOKEN_EXPIRE }
    )

    user.refreshToken = refreshToken
    await user.save()

    const userInfo = {
      _id: user._id,
      name: user.name,
      email: user.email,
      username: user.username,
      avatar: user.avatar,
    }

    res.status(200).cookie('token', refreshToken, {
      httpOnly: false,
      samSite: 'None',
      secure: true,
      maxAge: process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    }).json({ success: true, userInfo, role: user.role, accessToken })
  } catch (error) {
    next(new ErrorHandler(error.message))
  }
}

exports.signOut = async (req, res, next) => {
  try {
    const user = await User.findById(req.user_id)
    if (!user) {
      res
        .clearCookie('token', { sameSite: 'None' })
        .status(200).json({ success: true, message: 'Sign out successfully' })
    }

    user.refreshToken = ''
    await user.save()

    res
      .clearCookie('token', { sameSite: 'None' })
      .status(200).json({ success: true, message: 'Sign out successfully' })
  } catch (error) {
    next(new ErrorHandler(error.message))
  }
}

exports.signInWithGoogle = async (req, res, next) => {
  try {
    const verify = await oauth2Client.verifyIdToken({
      idToken: req.body.tokenId, audience: process.env.GOOGLE_OAUTH2_CLIENT_ID
    })
    const { email_verified, name, email, picture, sub } = verify.payload
    const username = email.slice(0, email.indexOf('@'))
    const password = email + sub

    if (!email_verified) return next(new ErrorHandler('Email verification failed.', 400))

    const user = await User.findOne({ username: username }).select('+password')

    if (user) {
      const isPasswordMatch = await user.comparePassword(password)
      if (!isPasswordMatch) return next(new ErrorHandler('Username or password incorrect', 400))

      const accessToken = jwt.sign(
        { _id: user._id },
        process.env.ACCESS_TOKEN_SECRET_KEY,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRE }
      )
      const refreshToken = jwt.sign(
        { _id: user._id },
        process.env.REFRESH_TOKEN_SECRET_KEY,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRE }
      )

      user.refreshToken = refreshToken
      await user.save()

      const userInfo = {
        _id: user._id,
        name: user.name,
        email: user.email,
        username: user.username,
        avatar: user.avatar,
      }

      res.status(200).cookie('token', refreshToken, {
        httpOnly: false,
        samSite: 'None',
        secure: true,
        maxAge: process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      }).json({ success: true, userInfo, role: user.role, accessToken })
    } else {
      const newUser = {
        name: name,
        email: email,
        username: username,
        password: password,
        avatar: {
          public_id: sub,
          url: picture
        },
        accountType: 'Google'
      }
      const user = await User.create(newUser)

      const accessToken = jwt.sign(
        { _id: user._id },
        process.env.ACCESS_TOKEN_SECRET_KEY,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRE }
      )
      const refreshToken = jwt.sign(
        { _id: user._id },
        process.env.REFRESH_TOKEN_SECRET_KEY,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRE }
      )

      user.refreshToken = refreshToken
      await user.save()

      const userInfo = {
        _id: user._id,
        name: user.name,
        email: user.email,
        username: user.username,
        avatar: user.avatar,
      }

      res.status(200).cookie('token', refreshToken, {
        httpOnly: false,
        samSite: 'None',
        secure: true,
        maxAge: process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      }).json({ success: true, userInfo, role: user.role, accessToken })
    }
  } catch (error) {
    next(new ErrorHandler(error.message))
  }
}

exports.signInWithFacebook = async (req, res, next) => {
  try {
    const facebookGraphAPI = `https://graph.facebook.com/v4.0/${req.body.userID}?fields=id,name,email,picture&access_token=${req.body.accessToken}`
    const dataFacebook = await fetch(facebookGraphAPI).then(res => res.json()).then(res => res)
    const { id, name, email, picture } = dataFacebook
    const username = email.slice(0, email.indexOf('@'))
    const password = email + id

    const user = await User.findOne({ username: username }).select('+password')

    if (user) {
      const isPasswordMatch = await user.comparePassword(password)
      if (!isPasswordMatch) return next(new ErrorHandler('Username or password incorrect', 400))

      const accessToken = jwt.sign(
        { _id: user._id },
        process.env.ACCESS_TOKEN_SECRET_KEY,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRE }
      )
      const refreshToken = jwt.sign(
        { _id: user._id },
        process.env.REFRESH_TOKEN_SECRET_KEY,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRE }
      )

      user.refreshToken = refreshToken
      await user.save()

      const userInfo = {
        _id: user._id,
        name: user.name,
        email: user.email,
        username: user.username,
        avatar: user.avatar,
      }

      res.status(200).cookie('token', refreshToken, {
        httpOnly: false,
        samSite: 'None',
        secure: true,
        maxAge: process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      }).json({ success: true, userInfo, role: user.role, accessToken })
    } else {
      const newUser = {
        name: name,
        email: email,
        username: username,
        password: password,
        avatar: {
          public_id: id,
          url: picture.data.url
        },
        accountType: 'Facebook'
      }
      const user = await User.create(newUser)

      const accessToken = jwt.sign(
        { _id: user._id },
        process.env.ACCESS_TOKEN_SECRET_KEY,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRE }
      )
      const refreshToken = jwt.sign(
        { _id: user._id },
        process.env.REFRESH_TOKEN_SECRET_KEY,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRE }
      )

      user.refreshToken = refreshToken
      await user.save()

      const userInfo = {
        _id: user._id,
        name: user.name,
        email: user.email,
        username: user.username,
        avatar: user.avatar,
      }

      res.status(200).cookie('token', refreshToken, {
        httpOnly: false,
        samSite: 'None',
        secure: true,
        maxAge: process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      }).json({ success: true, userInfo, role: user.role, accessToken })
    }
  } catch (error) {
    next(new ErrorHandler(error.message))
  }
}