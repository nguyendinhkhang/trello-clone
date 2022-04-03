import { Routes, Route, useLocation } from 'react-router-dom'
import Index from './pages/Index'
import Auth from './pages/Auth/Auth'
import MyBoard from './pages/MyBoard/MyBoard'
import Dashboard from './components/Dashboard/Dashboard'
import ProtectedRoute from './components/Routing/ProtectedRoute'
import CardDetailModal from './components/CardDetailModal/CardDetailModal'
import './App.scss'

const App = () => {
  const location = useLocation()
  return (
    <div className='App'>
      <Routes location={location.state?.background || location} >
        <Route path='/' element={<Index />} />
        <Route path='/sign-in' element={<Auth authRoute='signin' />} />
        <Route path='/sign-up' element={<Auth authRoute='signup' />} />
        <Route path='/account/activate/:activationToken' element={<Auth authRoute='signupLoading' />} />
        <Route path='/forgot-password' element={<Auth authRoute='forgotpassword' />} />
        <Route path='/account/reset-password/:resetPasswordToken' element={<Auth authRoute='resetpassword' />} />
        <Route element={<ProtectedRoute />}>
          <Route path='/:username/boards' element={<MyBoard />} />
          <Route path='/board/:id' element={<Dashboard />} />
        </Route>
      </Routes>
      {location.state?.background && (
        <Routes>
          <Route path='/card/:id' element={<CardDetailModal />} />
        </Routes>
      )}
    </div>
  )
}

export default App
