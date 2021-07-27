import '../styles/globals.css'
import {useRouter} from 'next/router'
import {useCookies} from 'react-cookie'



function MyApp({ Component, pageProps }) {
  const [cookies, setCookie, removeCookie] = useCookies('access_token')
  const router = useRouter()
  // console.log(cookies)
  const accessToken = cookies
  // console.log = accessToken
  return !accessToken ?  router.push('/') : <Component {...pageProps} />
}

export default MyApp
