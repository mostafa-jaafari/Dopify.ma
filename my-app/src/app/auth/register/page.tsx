import SectionHeader from '@/components/SectionHeader'
import React from 'react'
import RegisterForm from './RegisterForm'

export default function page() {
  return (
    <main className='w-full h-screen space-y-10 lg:px-20 px-6 py-4 flex flex-col items-center'>
        <SectionHeader 
            TITLE='Join Us Today!' 
            SUBTITLE='Create your account and unlock exclusive features. Sign up now!'
        />
        <RegisterForm />
    </main>
  )
}