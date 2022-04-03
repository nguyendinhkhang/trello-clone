import { useState } from 'react'
import { Link, useLocation, Navigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import GoogleLogin from 'react-google-login'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import useAuth from '../../hooks/useAuth'
import { signIn, signInWithFacebook, signInWithGoogle } from '../../redux/action/UserAction'
import Loader from '../Loader/Loader'
import LogoGoogle from '../../assets/Google_ G _Logo.svg'
import LogoFacebook from '../../assets/Facebook_F_Logo.svg'
import './AuthForm.scss'

const SignInForm = () => {
  const [signInData, setSignInData] = useState({
    username: '',
    password: ''
  })
  const [errUsername, setErrUsername] = useState()
  const [errPassword, setErrPassword] = useState()
  const dispatch = useDispatch()
  const { loadingUser, loading, auth, error } = useAuth()
  const location = useLocation()
  const from = location?.state?.from?.pathname || `/${auth.userInfo.username}/boards`

  const handleChangeInput = (e) => {
    setSignInData({
      ...signInData,
      [e.target.name]: e.target.value
    })
  }

  const handleBlurInputUsername = () => {
    if (!/^(?=[a-zA-Z0-9._]{6,30}$)(?!.*[_.]{2})[^_.].*[^_.]$/.test(signInData.username)) {
      setErrUsername('Username must be 6-30 characters, not contain _ or . at the begin and the end')
    } else {
      setErrUsername('')
    }
  }

  const handleBlurInputPassword = () => {
    if (!/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{6,30}$/.test(signInData.password)) {
      setErrPassword('Password must be 6-30 characters and contain at least 1 letter, 1 number and a special character')
    } else {
      setErrPassword('')
    }
  }

  const handleSubmitFormSignIn = (e) => {
    e.preventDefault()

    if (signInData.username === '') {
      setErrUsername('Please enter username')
    }
    if (signInData.password === '') {
      setErrPassword('Please enter password')
    }

    if (errUsername === '' && errPassword === '') {
      dispatch(signIn(signInData))
    }
  }

  const responseGoogle = (response) => {
    dispatch(signInWithGoogle({ tokenId: response.tokenId }))
  }

  const responseFacebook = (response) => {
    dispatch(signInWithFacebook({
      accessToken: response.accessToken,
      userID: response.userID
    }))
  }

  return (
    <>
      {loadingUser
        ? <Loader />
        : auth.isAuth
          ? <Navigate to={from} replace />
          : <>
            <h1 className='title-auth'>Sign in to Trello</h1>
            {error &&
              <p className='signup-message error-message'>
                {error}.
              </p>
            }
            <form className='form-auth' onSubmit={handleSubmitFormSignIn}>
              <div className='form-control'>
                <input
                  name='username'
                  className='input-auth'
                  type='text'
                  placeholder='Enter username'
                  disabled={loading}
                  value={signInData.username}
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
                  placeholder='Enter password'
                  disabled={loading}
                  value={signInData.password}
                  onChange={handleChangeInput}
                  onBlur={handleBlurInputPassword}
                />
                <p className='form-error'>{errPassword}</p>
              </div>
              <div className='form-control'>
                <button
                  className='btn-submit-auth'
                  type='submit'
                  disabled={loading}
                >
                  {loading ? <Loader loaderBtn /> : 'Sign In'}
                </button>
              </div>
            </form>
            <span className='or'>Or</span>
            <div className='auth-social'>
              <GoogleLogin
                clientId='80692683513-s81q8ma64a2lfh4kvbmhd717a4ri7dff.apps.googleusercontent.com'
                render={(renderProps) => (
                  <button
                    className='btn-auth-social'
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                  >
                    <img src={LogoGoogle} alt='Icon Google' />
                    Continue with Google
                  </button>
                )}
                onSuccess={responseGoogle}
                cookiePolicy={'single_host_origin'}
              />
              <FacebookLogin
                appId='306670098205705'
                autoLoad={false}
                fields='id,name,email,picture'
                callback={responseFacebook}
                render={(renderProps) => (
                  <button
                    className='btn-auth-social'
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                  >
                    <img className='logo-facebook' src={LogoFacebook} alt='Icon Facebook' />
                    Continue with Facebook
                  </button>
                )}
              />
            </div>
            <div className='auth-option'>
              <Link to='/forgot-password' className='link-option'>Forgot password?</Link>
              <Link to='/sign-up' className='link-option'>Sign up</Link>
            </div>
          </>
      }
    </>
  )
}

export default SignInForm