"use client";

import logo from '../assets/credentials-logo.png';

export default function CredentialLayout({children}: {children: React.ReactElement}) {
  return (
    <div className="flex flex-row min-h-screen">
      <div className='flex bg-light-bg border flex-[1_1_50%] justify-center items-center'>
        <img src={logo} className='w-1/2 h-1/2'/>
      </div>
      <div className='flex flex-[1_0_50%]'>
        {children}
      </div>
    </div>
  )
}