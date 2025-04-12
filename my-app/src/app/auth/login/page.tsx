import SectionHeader from '@/components/SectionHeader'
import React from 'react'
import LoginForm from './LoginForm'
import Image from 'next/image'
import SideImage from '../../../../public/Login Image.jpg';



export default function page() {
  return (
    <main className='w-full h-screen flex'>
      <section className='bg-blue-100 w-full h-full px-6 flex flex-col items-center justify-center space-y-10'>
          <SectionHeader
            IsAnimatedTextTyping={true}
            TITLE='Welcome Back!' 
            SUBTITLE='Your Next Adventure Awaits.'
        />
        <LoginForm />
        </section>
      <section className='hidden lg:block relative w-full h-full overflow-hidden'>
        <Image src={SideImage} alt='' fill className='object-contain' />
      </section>
    </main>
  )
}
