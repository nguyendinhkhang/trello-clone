import { useLocation, Navigate, Outlet } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

const ProtectedRoute = () => {
  const { auth } = useAuth()
  const location = useLocation()

  return (
    auth.isAuth
      ? <Outlet />
      : <Navigate to='/sign-in' state={{ from: location }} replace />
  )
}

export default ProtectedRoute