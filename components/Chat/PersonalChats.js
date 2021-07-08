import {useState} from "react"
import Image from 'next/image'
function PersonalChats({isActive}) {
    const [active, setActive] = useState(false)

    const ChatData = [
        {
            "id":1,
            "username": "@mat",
            "email": "mat@somemail.com",
            "firstname":"Matt",
            "lastname": "Smith",
            "isTyping": false,
            "messageSnippet": "Howdy Partner",
            "profileImage": '/assets/profilepic.png',
            "dateRecieved": "09:30",
            "messageCount": 4,
            "hasRecieved": true,
            "hasRead": true,
        },
        {
            "id":2,
            "username": "@corey",
            "email": "corey@somemail.com",
            "firstname":"Corey",
            "lastname": "Jerald",
            "messageSnippet": "Yes the meeting is set for tomorrow",
            "profileImage": '/assets/profilepic.png',
            "dateRecieved": "09:32",
            "messageCount": 1,
            "hasRecieved": true,
            "hasRead": false,
        },
        {
            "id":3,
            "username": "@james",
            "email": "james@somemail.com",
            "firstname":"James",
            "lastname": "Smith",
            "isTyping": true,
            "profileImage": '/assets/profilepic.png',
            "dateRecieved": "8:14",
            "messageCount": 4,
            "hasRecieved": true,
            "hasRead": true,
        },
        {
            "id":4,
            "username": "@brightney",
            "email": "brightney@somemail.com",
            "firstname":"Brightnney",
            "lastname": "Jackson",
            "messageSnippet": "Call me now",
            "profileImage": '/assets/profilepic.png',
            "messageSnippet": "You: Howdy Partner",
            "dateRecieved": "6:15",
            "messageCount": 4,
            "hasRecieved": true,
            "hasRead": true,
        },
        {
            "id":5,
            "username": "@morton",
            "email": "mat@somemail.com",
            "firstname":"Matt",
            "lastname": "Smith",
            "messageSnippet": "Jake is in today.",
            "profileImage": '/assets/profilepic.png',
            "dateRecieved": "09:30",
            "messageCount": 4,
            "hasRecieved": true,
            "hasRead": true,
        },
        {
            "id":6,
            "username": "@ryan",
            "email": "ryan@somemail.com",
            "firstname":"Ryan",
            "lastname": "Brown",
            "messageSnippet": "Jake is in today.",
            "profileImage": '/assets/profilepic.png',
            "dateRecieved": "09:30",
            "messageCount": 4,
            "hasRecieved": true,
            "hasRead": true,
        },
        {
            "id":7,
            "username": "@maroon",
            "email": "maroon@somemail.com",
            "firstname":"Maroon",
            "lastname": "Fox",
            "messageSnippet": "In January",
            "profileImage": '/assets/profilepic.png',
            "dateRecieved": "09:30",
            "messageCount": 4,
            "hasRecieved": true,
            "hasRead": true,
        },
        {
            "id":8,
            "username": "@kampamba",
            "email": "kampamba@somemail.com",
            "firstname":"Kampamba",
            "lastname": "Chanda",
            "messageSnippet": "In January",
            "profileImage": '/assets/profilepic.png',
            "dateRecieved": "Yesterday",
            "messageCount": 4,
            "hasRecieved": true,
            "hasRead": true,
        },
        {
            "id":9,
            "username": "@cephas",
            "email": "cephas@somemail.com",
            "firstname":"Cephas",
            "lastname": "Chapa",
            "messageSnippet": "In January",
            "profileImage": '/assets/profilepic.png',
            "dateRecieved": "Yesterday",
            "messageCount": 4,
            "hasRecieved": true,
            "hasRead": true,
        },
        {
            "id":10,
            "username": "@paul",
            "email": "paul@somemail.com",
            "firstname":"Paul",
            "lastname": "Lokende",
            "messageSnippet": "In January",
            "profileImage": '/assets/profilepic.png',
            "dateRecieved": "Yesterday",
            "messageCount": 4,
            "hasRecieved": true,
            "hasRead": true,
        },
    ]
    const Controller = e=>{setActive(true)}
    
    return (
        <div>
            <ul>
            {
                ChatData.map((data) => {
                    return (
                        <li onClick={Controller} key={data.id} className={`${active == true ? 'bg-white' : 'border-b border-[#ffffff]'} text-gray-500 mb-2 bg-white rounded-2xl flex items-center p-2`}>
                            <div className="flex flex-col w-24 h-full">
                                {/* <Image src={data.profileImage} alt="userpicture" height="60" width="60"/> */}
                                <div className="h-16 w-16 bg-gray-300 rounded-full">

                                </div>
                            </div>
                            <div className="flex flex-col w-full">
                                <div className="flex flex-row justify-between">
                                    <p className="font-bold">{data.firstname}</p>
                                    <p className="text-xs">{data.dateRecieved}</p>
                                </div>
                                <div className="flex flex-row w-full">
                                    <p className="text-gray-400">{data.isTyping? 'Typing...' : data.messageSnippet}</p>
                                </div>
                            </div>
                        </li>
                    )
                })
            }
            </ul>
        </div>
    )
}

export default PersonalChats
