import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams, Link, useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import { resetPassword } from '../../redux/action/UserAction'
import Loader from '../Loader/Loader'
import './AuthForm.scss'

const ResetPasswordForm = () => {
  const [resetPasswordData, setResetPasswordData] = useState({
    password: '',
    confirmPassword: ''
  })
  const [errPassword, setErrPassword] = useState()
  const [errConfirmPassword, setErrConfirmPassword] = useState()
  const { loading, isResetSuccess, error } = useAuth()
  const { resetPasswordToken } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleChangeInput = (e) => {
    setResetPasswordData({
      ...resetPasswordData,
      [e.target.name]: e.target.value
    })
  }

  const handleBlurInputPassword = () => {
    if (!/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{6,30}$/.test(resetPasswordData.password)) {
      setErrPassword('Password must be 6-30 characters and contain at least 1 letter, 1 number and a special character')
    } else {
      setErrPassword('')
    }
  }

  const handleBlurInputConfirmPassword = () => {
    if (resetPasswordData.confirmPassword !== resetPasswordData.password) {
      setErrConfirmPassword('Confirm password do not match')
    } else {
      setErrConfirmPassword('')
    }
  }

  const handleSubmitFormResetPassword = (e) => {
    e.preventDefault()

    if (resetPasswordData.password === '') {
      setErrPassword('Please enter password')
    }
    if (resetPasswordData.confirmPassword === '') {
      setErrConfirmPassword('Please enter confirm password')
    }

    if (errPassword === '' && errConfirmPassword === '') {
      dispatch(resetPassword({ resetPasswordToken, resetPassword: resetPasswordData.password }))
    }
  }

  useEffect(() => {
    if (isResetSuccess === true) navigate('/sign-in')
  }, [isResetSuccess, navigate])

  return (
    <>
      <h1 className='title-auth'>Reset your password</h1>
      {error &&
        <p className='signup-message error-message'>
          {error === 'jwt expired'
            ? 'Reset password failed.'
            : `${error}. `
          }
          Please <Link className='link-signup' to='/forgot-password'>enter email</Link> again.
        </p>
      }
      <form className='form-auth' onSubmit={handleSubmitFormResetPassword}>
        <div className='form-control'>
          <input
            name='password'
            className='input-auth'
            type='password'
            placeholder='Enter new password'
            disabled={loading}
            value={resetPasswordData.password}
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
            placeholder='Enter confirm new password'
            disabled={loading}
            value={resetPasswordData.confirmPassword}
            onChange={handleChangeInput}
            onBlur={handleBlurInputConfirmPassword}
          />
          <p className='form-error'>{errConfirmPassword}</p>
        </div>
        <div className='form-control'>
          <button className='btn-submit-auth' type='submit' disabled={loading}>
            {loading ? <Loader loaderBtn /> : 'Reset password'}
          </button>
        </div>
      </form>
    </>
  )
}

export default ResetPasswordForm