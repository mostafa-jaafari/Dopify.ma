import SectionHeader from '@/components/SectionHeader'
import React from 'react'
import RegisterForm from './RegisterForm'
import SideImage from '../../../../public/Registration Image.jpg';
import Image from 'next/image';



export default function page() {
  return (
    <main className='w-full h-screen flex'>
      <section className='bg-blue-100 w-full h-full px-6 flex flex-col items-center justify-center space-y-10'>
        <SectionHeader 
            TITLE='Join Us Today!' 
            SUBTITLE='Create your account and unlock exclusive features. Sign up now!'
            />
        <RegisterForm />
      </section>
      <section className='hidden bg-white lg:block relative w-full h-full overflow-hidden'>
        <Image src={SideImage} alt='' fill className='object-contain' />
      </section>
    </main>
  )
}