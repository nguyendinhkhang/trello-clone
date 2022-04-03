const express = require('express')
const router = express.Router()
const {
  signUp,
  signUpEmailActivation,
  activateEmail,
  signIn,
  refreshToken,
  getUserById,
  signOut,
  signInWithGoogle,
  signInWithFacebook,
  forgotPassword,
  resetPassword
} = require('../controllers/UserController')
const {
  validateSignUp,
  validateSignIn,
  validateActivateEmail,
  validateTokenId,
  validateDataSignInFacebook,
  validateForgotPassword,
  validateResetPassword
} = require('../middlewares/Validator')
const { verifyRefreshToken } = require('../middlewares/Authenticator')

router.route('/user/sign-up').post(validateSignUp, signUpEmailActivation)
router.route('/user/activation').post(validateActivateEmail, activateEmail)
router.route('/user/sign-in').post(validateSignIn, signIn)
router.route('/user/sign-in-google').post(validateTokenId, signInWithGoogle)
router.route('/user/sign-in-facebook').post(validateDataSignInFacebook, signInWithFacebook)
router.route('/user/forgot-password').post(validateForgotPassword, forgotPassword)
router.route('/user/reset-password').post(validateResetPassword, resetPassword)
router.route('/user/refresh-token').get(verifyRefreshToken, refreshToken)
router.route('/user/me').get(verifyRefreshToken, getUserById)
router.route('/user/sign-out').get(verifyRefreshToken, signOut)

module.exports = router