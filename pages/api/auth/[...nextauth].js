import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import axios from 'axios'

const providers = [
    Providers.Credentials({
        name: "Credentials",
        authorize: async (credentials) => {
            try {
              const url = 'https://chat.dazmessenger.com/_matrix/client/r0/login'
              const user = await axios.post(url,
                {
                  "identifier": {
                      "type": "m.id.user",
                      "user": credentials.username
                    },
                    
                    "password": credentials.password,
                    "type": "m.login.password"
                
                },
              {
                headers: {
                  accept: '*/*',
                  'Content-Type': 'application/json'
                }
              })
            const userSession = user.data
            if (userSession) {
              // console.log(userSession)
              return {status: 'success', data: userSession}
            } else{
              return {status: 'error', data: userSession.error}
            }
            } catch (e){
                // console.log(e.response.data.error)
                return {status: 'error', data:e.response.data.error}
            }
          }
        })
]

const callbacks = {
    async jwt(token, userSession){
        if(userSession){
            token.accessToken = userSession.access_token
        }

        return token
    },
    async session(session, token){
        session.accessToken = token.access_token
        return session
    }
}

const options = {
    providers,
    callbacks,
    pages: {
      error: '/',
      home:'chat/'
    },
}

export default (req, res) => NextAuth(req, res, options)