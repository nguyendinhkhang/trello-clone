import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { signUp } from '../../redux/action/UserAction'
import useAuth from '../../hooks/useAuth'
import Loader from '../Loader/Loader'
import sendEmailImage from '../../assets/10381620386430630.png'
import './AuthForm.scss'

const SignUpForm = () => {
  const [signUpData, setSignUpData] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  })
  const [errName, setErrName] = useState()
  const [errEmail, setErrEmail] = useState()
  const [errUsername, setErrUsername] = useState()
  const [errPassword, setErrPassword] = useState()
  const [errConfirmPassword, setErrConfirmPassword] = useState()
  const dispatch = useDispatch()
  const { loading, isSigningUp } = useAuth()

  const handleChangeInput = (e) => {
    setSignUpData({
      ...signUpData,
      [e.target.name]: e.target.value
    })
  }

  const handleBlurInputName = () => {
    if (!/[A-Za-z]{3,30}/.test(signUpData.name)) {
      setErrName('Name must be 3-30 letters')
    } else {
      setErrName('')
    }
  }

  const handleBlurInputEmail = () => {
    if (!/^(([^<>()[\]\\.,;:\s@\\"]+(\.[^<>()[\]\\.,;:\s@\\"]+)*)|(\\".+\\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(signUpData.email)) {
      setErrEmail('Invalid email')
    } else {
      setErrEmail('')
    }
  }

  const handleBlurInputUsername = () => {
    if (!/^(?=[a-zA-Z0-9._]{6,30}$)(?!.*[_.]{2})[^_.].*[^_.]$/.test(signUpData.username)) {
      setErrUsername('Username must be 6-30 characters, not contain _ or . at the begin and the end')
    } else {
      setErrUsername('')
    }
  }

  const handleBlurInputPassword = () => {
    if (!/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{6,30}$/.test(signUpData.password)) {
      setErrPassword('Password must be 6-30 characters and contain at least 1 letter, 1 number and a special character')
    } else {
      setErrPassword('')
    }
  }

  const handleBlurInputConfirmPassword = () => {
    if (signUpData.confirmPassword !== signUpData.password) {
      setErrConfirmPassword('Confirm password do not match')
    } else {
      setErrConfirmPassword('')
    }
  }

  const handleSubmitFormSignUp = (e) => {
    e.preventDefault()

    if (signUpData.name === '') {
      setErrName('Please enter name')
    }
    if (signUpData.email === '') {
      setErrEmail('Please enter email')
    }
    if (signUpData.username === '') {
      setErrUsername('Please enter username')
    }
    if (signUpData.password === '') {
      setErrPassword('Please enter password')
    }
    if (signUpData.confirmPassword === '') {
      setErrConfirmPassword('Please enter confirm password')
    }

    if (errName === '' && errEmail === '' && errUsername === '' && errPassword === '' && errConfirmPassword === '') {
      dispatch(signUp({
        name: signUpData.name,
        email: signUpData.email,
        username: signUpData.username,
        password: signUpData.password
      }))
    }
  }

  return (
    <>
      <h1 className='title-auth'>Sign up your account</h1>
      {isSigningUp
        ? <div className='signup-send-email'>
          <img className='sendEmail' src={sendEmailImage} alt='Image Send Email' />
          <p className='signup-message'>We have sent your account activation email to <span>{signUpData.email}</span>. Please email to activate your account.</p>
        </div>
        : <>
          <form className='form-auth' onSubmit={handleSubmitFormSignUp}>
            <div className='form-control'>
              <input
                name='name'
                className='input-auth'
                type='text'
                placeholder='Enter your name'
                disabled={loading}
                value={signUpData.name}
                onChange={handleChangeInput}
                onBlur={handleBlurInputName}
              />
              <p className='form-error'>{errName}</p>
            </div>
            <div className='form-control'>
              <input
                name='email'
                className='input-auth'
                type='email'
                placeholder='Enter your email'
                disabled={loading}
                value={signUpData.email}
                onChange={handleChangeInput}
                onBlur={handleBlurInputEmail}
              />
              <p className='form-error'>{errEmail}</p>
            </div>
            <div className='form-control'>
              <input
                name='username'
                className='input-auth'
                type='text'
                placeholder='Enter your username'
                disabled={loading}
                value={signUpData.username}
                onChange={handleChangeInput}
                onBlur={handleBlurInputUsername}
              />
              <p className='form-error'>{errUsername}</p>
            </div>
            <div className='form-control'>
              <input
                name='password'
                className='input-auth'
                type='password'
                placeholder='Enter your password'
                disabled={loading}
                value={signUpData.password}
                onChange={handleChangeInput}
                onBlur={handleBlurInputPassword}
              />
              <p className='form-error'>{errPassword}</p>
            </div>
            <div className='form-control'>
              <input
                name='confirmPassword'
                className='input-auth'
                type='password'
                placeholder='Enter confirm password'
                disabled={loading}
                value={signUpData.confirmPassword}
                onChange={handleChangeInput}
                onBlur={handleBlurInputConfirmPassword}
              />
              <p className='form-error'>{errConfirmPassword}</p>
            </div>
            <div className='form-control'>
              <button className='btn-submit-auth' type='submit' disabled={loading}>
                {loading ? <Loader loaderBtn /> : 'Sign Up'}
              </button>
            </div>
          </form>
          <div className='auth-option' style={{ justifyContent: 'center' }}>
            <Link to='/sign-in' className='link-option'>You already have an account? Sign in</Link>
          </div>
        </>
      }
    </>
  )
}

export default SignUpForm