import axios from 'axios';
import type { AppProps /*, AppContext */ } from 'next/app'
import 'antd/dist/antd.css'
import '../public/main.scss'

axios.defaults.baseURL = 'http://localhost:4001'
axios.interceptors.request.use(
  (config) => {
    if (process.browser) {
      const token = sessionStorage.getItem('_token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (err) => Promise.reject(err)
);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Component {...pageProps} />
  )
}

export default MyApp