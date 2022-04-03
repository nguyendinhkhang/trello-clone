import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import sendEmailImage from '../../assets/10381620386430630.png'
import useAuth from '../../hooks/useAuth'
import { forgotPassword } from '../../redux/action/UserAction'
import Loader from '../Loader/Loader'
import './AuthForm.scss'

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState('')
  const [errEmail, setErrEmail] = useState()
  const { loading, isForgotPassword } = useAuth()
  const dispatch = useDispatch()

  const handleChangeInput = (e) => {
    setEmail(e.target.value)
  }

  const handleBlurInputEmail = () => {
    if (!/^(([^<>()[\]\\.,;:\s@\\"]+(\.[^<>()[\]\\.,;:\s@\\"]+)*)|(\\".+\\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
      setErrEmail('Invalid email')
    } else {
      setErrEmail('')
    }
  }

  const handleSubmitForm = (e) => {
    e.preventDefault()

    if (email === '') {
      setErrEmail('Please enter your email')
    }

    if (errEmail === '') {
      dispatch(forgotPassword({ email: email }))
    }
  }

  return (
    <>
      <h1 className='title-auth'>Forgot password?</h1>
      {isForgotPassword
        ? <div className='signup-send-email'>
          <img className='sendEmail' src={sendEmailImage} alt='Image Send Email' />
          <p className='signup-message'>We have sent reset password email to <span>{email}</span>. Please email to reset your password.</p>
        </div>
        : <>
          <form className='form-auth' onSubmit={handleSubmitForm}>
            <div className='form-control'>
              <input
                className='input-auth'
                type='email'
                placeholder='Enter your email'
                disabled={loading}
                value={email}
                onChange={handleChangeInput}
                onBlur={handleBlurInputEmail}
              />
              <p className='form-error'>{errEmail}</p>
            </div>
            <div className='form-control'>
              <button className='btn-submit-auth' type='submit' disabled={loading}>
                {loading ? <Loader loaderBtn /> : 'Forgot password'}
              </button>
            </div>
          </form>
          <div className='auth-option'>
            <Link to='/sign-in' className='link-option'>Back to Sign in</Link>
          </div>
        </>
      }
    </>
  )
}

export default ForgotPasswordForm