import { useDispatch } from 'react-redux'
import { refreshToken } from '../redux/action/UserAction'

const useRefreshToken = () => {
  const dispatch = useDispatch()
  const refresh = () => {
    return dispatch(refreshToken())
  }
  return refresh
}

export default useRefreshToken