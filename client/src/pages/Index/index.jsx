import { Link, Navigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

const Index = () => {
  const { auth } = useAuth()
  return (
    auth.isAuth
      ? <Navigate to={`/${auth.userInfo.username}/boards`} />
      : <>
        <h1>Index</h1>
        <Link to='/sign-in'>Sign In</Link>
      </>
  )
}

export default Index