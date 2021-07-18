import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import ChatSection from '../../components/Chat/ChatSection';
import WelcomeSection from '../../components/Chat/WelcomeSection'
import Midpanel from '../../components/Midpanel/Midpanel';
import Navbar from '../../components/Navbar';
function ChatHome() {
    return (
        <div className="h-screen">
            <Head>
                <title>ZCF | Chat</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/logo.jpeg" />
            </Head>
            <main className="flex h-screen w-full">
                {/* Container wrapper */}
                <div className="flex w-full">
                    {/* Left navigation Panel */}
                        <Navbar active={true}/>
                    {/* Mid items panel */}
                        <Midpanel />
                    {/* Chat section */}
                    {/* <ChatSection /> */}
                    {/* Chat first use and no active chat section */}
                        <WelcomeSection />
                </div>
            </main>
        </div>
    )
}

export default ChatHome
