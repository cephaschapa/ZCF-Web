import '../styles/globals.css'
import Router from 'next/router'
import {useCookies} from 'react-cookie'
import {useEffect} from 'react'
import Head from 'next/head'
import ProgressBar from "@badrap/bar-of-progress";


function MyApp({ Component, pageProps, accessToken, user_id }) {
  // const Router = useRouter()
  const progress = new ProgressBar({
    size: 4,
    color: "#2196f3",
    className: "bar-of-progress",
    delay: 100,
  });

  Router.events.on("routeChangeStart", progress.start);
  Router.events.on("routeChangeComplete", progress.finish);
  Router.events.on("routeChangeError", progress.finish);

  useEffect(() => {
    if("serviceWorker" in navigator) {
      window.addEventListener("load", function () {
       navigator.serviceWorker.register("/sw.js").then(
          function (registration) {
            console.log("Service Worker registration successful with scope: ", registration.scope);
          },
          function (err) {
            console.log("Service Worker registration failed: ", err);
          }
        );
      });
    }
  }, [])

  

  return(
    <div>
      <Head>
          <link rel="manifest" href="/manifest.json" />
          <link rel="apple-touch-icon" href="/100.png" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
          <meta name="apple-mobile-web-app-status-bar" content="#90cdf4" />
          <meta name="theme-color" content="#ffffff" />
      </Head>
      
      <Component {...pageProps} />
    </div>)  
}

export default MyApp

export async function getServerSideProps(context) {
  const cookies = new Cookies(context.req, context.res)
    const accessToken = cookies.get('access_token')
    console.log(accessToken)
    if(!accessToken){
        console.log("No token")
        return {
            redirect: {
                permanent: false,
                destination: "/"
              }
        }
    }else{

    // Sync room state - Cradle of chat
     
    const res = await axios.get('https://chat.zcfchat.com/_matrix/client/r0/account/whoami',{
        headers: {
                'Content-Type': 'application/json',
                 accept: '*/*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
        }
    })
    const user_id = res.data.user_id
    return {
      props: {
        accessToken,
        user_id,
      }
    }
    }
}
