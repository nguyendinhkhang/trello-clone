import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import { signOut } from '../../redux/action/UserAction'
import useOutSideClick from '../../hooks/useOutSideClick'
import './Navbar.scss'

const Navbar = () => {
  const { ref, isOpen, setIsOpen } = useOutSideClick()
  const { auth } = useAuth()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const hanldeClickMyBoards = () => {
    setIsOpen(false)
    navigate(`/${auth.userInfo.username}/boards`)
  }

  const hanldeClickSignOut = () => {
    setIsOpen(false)
    dispatch(signOut())
  }

  return (
    <nav className='navbar-app'>
      <div className='logo-container'>
        <Link to={`/${auth.userInfo.username}/boards`} className='logo'></Link>
      </div>
      {auth.isAuth &&
        <div className='user-container'>
          <img
            src={auth.userInfo.avatar.url}
            alt={auth.userInfo.username}
            className='user-avatar'
            onClick={() => setIsOpen(true)}
          />
          {isOpen &&
            <div className='extras-list' ref={ref}>
              <div className='extras-header'>
                <span>Account</span>
                <div className='extras-close' onClick={() => setIsOpen(false)}>
                  <i className='bi bi-x-lg' />
                </div>
              </div>
              <ul className='extras-list-item'>
                <li className='extras-item' onClick={() => setIsOpen(false)}>
                  <img src={auth.userInfo.avatar.url} alt={auth.userInfo.username} className='user-avatar-info' />
                  <div className='extras-item-user-info'>
                    <span className='info-name'>{auth.userInfo.name}</span>
                    <span className='info-username'>@{auth.userInfo.username}</span>
                  </div>
                </li>
                <li className='extras-item' onClick={hanldeClickMyBoards}>My Board</li>
                <li className='extras-item color-red' onClick={hanldeClickSignOut}>Sign Out</li>
              </ul>
            </div>
          }
        </div>
      }
    </nav>
  )
}

export default Navbar