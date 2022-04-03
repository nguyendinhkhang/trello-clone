import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux/store'
import setupInterceptor from './apis/dataApiPrivateInterceptor'
import { loadUser } from './redux/action/UserAction'
import 'bootstrap-icons/font/bootstrap-icons.css'
import App from './App'

if (document.cookie.includes('token=')) {
  store.dispatch(loadUser())
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

setupInterceptor(store)
