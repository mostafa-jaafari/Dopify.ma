'use client';
import { signIn, signOut } from 'next-auth/react';
import React from 'react';
import GoogleIcon from '../../public/GoogleIcon.svg';
import Image from 'next/image';

export const SignInGoogle = () => {

  const HandleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    signIn('google');
  }

  return (
    <section className='space-y-4'>
      <div className='w-full flex items-center gap-2'>
        <hr className='w-full border-neutral-300'/>
        <span>Or</span>
        <hr className='w-full border-neutral-300'/>
      </div>
      <button
        onClick={HandleSubmit}
        className="flex items-center justify-center 
        gap-2 w-full bg-gray-100 hover:bg-gray-200
        border border-neutral-300 shadow 
        cursor-pointer text-black py-2 rounded-lg"
      >
        <Image src={GoogleIcon} width={30} alt='Google Provider' ></Image>
        <span className="font-medium text-lg">Sign in with Google</span>
      </button>
    </section>
  )
}

export const SignOut = () => {
  return (
    <button 
      onClick={() => signOut()}
      className='bg-red-900 text-white font-semibold hover:bg-red-800 
        w-full cursor-pointer py-1 rounded-lg mt-1 hover:text-red-100'
    >
        Sign Out
    </button>
  )
}