import { Link, Navigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import index_logo from '../../assets/Trello_Logo_Index.svg'
import img_background_index from '../../assets/bg_img_index.png'
import './index.scss'

const Index = () => {
  const { auth } = useAuth()
  return (
    auth.isAuth
      ? <Navigate to={`/${auth.userInfo.username}/boards`} />
      : <>
        <div className='index'>
          <div className='nav-index'>
            <div className='logo-index'>
              <img className='img-logo-index' src={index_logo} alt='Logo' />
            </div>
            <div className='nav-link'>
              <Link to='/sign-in' className='sign-in'>Login</Link>
              <Link to='/sign-up' className='sign-up'>Sign up</Link>
            </div>
          </div>
          <div className='index-content'>
            <img className='img-background' src={img_background_index} alt='Background Image' />
            <section className='hero'>
              <div className='hero-container'>
                <h1 className='hero-title'>Trello helps teams move work forward.</h1>
                <p className='hero-content'>
                  Collaborate, manage projects, and reach new productivity peaks. From high rises to the home office, the way your team works is unique—accomplish it all with Trello.
                </p>
                <Link to='/sign-up' className='link-join-us'>Join us - it&apos;s free!</Link>
              </div>
            </section>
          </div>
        </div>
      </>
  )
}

export default Index