import { dataApiPrivate } from './dataApi'
import { refreshToken } from '../redux/action/UserAction'

const setupInterceptor = (store) => {
  dataApiPrivate.interceptors.request.use(
    async (config) => {
      if (!config.headers['authorization']) {
        const accessToken = store.getState().user.auth.accessToken
        config.headers['authorization'] = `Bearer ${accessToken}`
      }
      return config
    }, (error) => Promise.reject(error)
  )

  dataApiPrivate.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config
      if (error.response.status === 403 && !originalRequest._retry) {
        originalRequest._retry = true
        await store.dispatch(refreshToken())
        const accessToken = store.getState().user.auth.accessToken
        originalRequest.headers['authorization'] = `Bearer ${accessToken}`
        return (dataApiPrivate(originalRequest))
      }
      return Promise.reject(error)
    }
  )
}

export default setupInterceptor