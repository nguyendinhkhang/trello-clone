import SignInForm from '../../components/AuthForm/SignInForm'
import SignUpForm from '../../components/AuthForm/SignUpForm'
import SignUpLoading from '../../components/AuthForm/SignUpLoading'
import ForgotPasswordForm from '../../components/AuthForm/ForgotPasswordForm'
import ResetPasswordForm from '../../components/AuthForm/ResetPasswordForm'
import TrelloMainLogo from '../../assets/trello-logo-blue.f7627b3a.svg'
import ImgBgLeft from '../../assets/undraw_professor_re_mj1s.svg'
import ImgBgRight from '../../assets/undraw_picture_re_ne03.svg'
import './Auth.scss'

const Auth = ({ authRoute }) => {
  return (
    <div className='auth'>
      <header className='header-auth'>
        <img src={TrelloMainLogo} alt='Trello Main Logo' />
      </header>
      <section className='section-auth'>
        <div className='wrapper-auth'>
          <div className='auth-container'>
            {authRoute === 'signin' && <SignInForm />}
            {authRoute === 'signup' && <SignUpForm />}
            {authRoute === 'signupLoading' && <SignUpLoading />}
            {authRoute === 'forgotpassword' && <ForgotPasswordForm />}
            {authRoute === 'resetpassword' && <ResetPasswordForm />}
          </div>
        </div>
      </section>
      <img src={ImgBgLeft} alt='ImgBgLeft' className='imgBgLeft' />
      <img src={ImgBgRight} alt='ImgBgRigt' className='imgBgRight' />
    </div>
  )
}

export default Auth