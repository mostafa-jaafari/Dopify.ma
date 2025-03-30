import SectionHeader from '@/components/SectionHeader'
import React from 'react'
import LoginForm from './LoginForm'

export default function page() {
  return (
    <main className='w-full h-screen space-y-10 lg:px-20 px-6 py-20 flex flex-col items-center'>
        <SectionHeader 
            TITLE='Welcome Back!' 
            SUBTITLE='Your Next Adventure Awaits.'
        />
        <LoginForm />
    </main>
  )
}
