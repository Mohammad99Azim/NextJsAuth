import axios from "axios";
import { NextRouter } from "next/router";
import { initUser, NO_TOKEN, ON_SERVER_TOKEN } from './constants'

export const register = async (signupRequest: SignupRequest) => {
  return await axios.post('/api/auth/signup', signupRequest).then(res => {
    saveTokenToSession(res.data.token)
    process.env.NODE_ENV === 'development' ? console.log("data: " + JSON.stringify(res.data)) : ''
    return 'SUCCESS'
  }).catch(err => {
    const message = (err.response && err.response.data && err.response.data.message) ||
      err.message || err.toString();
    process.env.NODE_ENV === 'development' ? console.error("error: " + message) : ''
    return 'FAIL'
  })
};

function saveTokenToSession(_token: string) {
  if (_token) {
    sessionStorage.setItem('_token', _token)
  }
}

export const login = async (loginRequest: LoginRequest) => {
  return await axios.post('/api/auth/login', loginRequest)
    .then((res) => {
      saveTokenToSession(res.data.token)
      process.env.NODE_ENV === 'development' ? console.log("data: " + JSON.stringify(res.data)) : ''
      return 'SUCCESS'
    }).catch((err) => {
      const message = (err.response && err.response.data && err.response.data.message) ||
        err.message || err.toString();
      process.env.NODE_ENV === 'development' ? console.error("error: " + message) : ''
      return 'FAIL'
    });
};

export const logout = () => {
  sessionStorage.removeItem('_token')
};

export const getTokenFromSession = () => {
  let _token = process.browser ? sessionStorage.getItem('_token') : ON_SERVER_TOKEN
  if(_token !== ON_SERVER_TOKEN){
    if(!_token){
      _token = NO_TOKEN
    }
  }
  return _token
};

export const checkUser = async () => {
  let user: CheckUserResponse = initUser
  return await axios.get('/api/auth/me')
    .then((res) => {
      user = res.data
      process.env.NODE_ENV === 'development' ? console.log("checkUser data: " + JSON.stringify(user)) : ''
      return user
    }).catch((err) => {
      const message = (err.response && err.response.data && err.response.data.message)
        || err.message || err.toString();
      process.env.NODE_ENV === 'development' ? console.error("error: " + message) : ''
      return user
    })
};

export const routeToLogin = (router: NextRouter) => {
  if (process.browser) {
    router.push('/auth/login')
  }
}

export const routeToIndex = (router: NextRouter) => {
  if (process.browser) {
    router.push('/')
  }
}