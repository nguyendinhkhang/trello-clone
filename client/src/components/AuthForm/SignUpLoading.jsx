import { useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { activateEmail } from '../../redux/action/UserAction'
import useAuth from '../../hooks/useAuth'
import Loader from '../Loader/Loader'

const SignUpLoading = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { activationToken } = useParams()
  const { isSigningUp, auth, error } = useAuth()
  useEffect(() => {
    dispatch(activateEmail({ activationToken }))
    if (auth.isAuth) navigate(`/${auth.userInfo.username}/boards`)
  }, [dispatch, activationToken, auth, navigate])
  return (
    <>
      {isSigningUp
        ? <Loader />
        : error && <div className='signup-send-email'>
          <p className='signup-message error-message'>
            {error === 'jwt expired'
              ? 'Activation expired. '
              : `${error}. `
            }
            Please <Link className='link-signup' to='/sign-up'>sign up</Link> again.
          </p>
        </div>
      }
    </>
  )
}

export default SignUpLoading