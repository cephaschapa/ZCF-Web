import axios from 'axios'
export default async function getUserData(){
    const accessToken = localStorage.getItem('access_token')
    // get user information

    // get user id
    const res = await axios.get('https://chat.dazmessenger.com/_matrix/client/r0/account/whoami',{
        headers: {
                'Content-Type': 'application/json',
                 accept: '*/*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
        }
    })
    const data = res.data.user_id
    // console.log(res.data.user_id)
    return {data}
}