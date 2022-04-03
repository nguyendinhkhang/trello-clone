import { useSelector } from 'react-redux'
const useAuth = () => useSelector(state => state.user)
export default useAuth