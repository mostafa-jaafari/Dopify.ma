import DashboardWelcome from '@/components/DashboardWelcome'
import QuickSetupGuide from '@/components/QuickSetupGuide'
import { StatusCard_Links } from '@/GlobalLinks'
import React from 'react'

export default function page() {
  
  return (
    <main className='min-h- w-full p-8 space-y-8'>
      <DashboardWelcome />
      <QuickSetupGuide />
      <section className='w-full grid grid-cols-4 gap-2'>
        {StatusCard_Links.map((process, index) => {
        return (
          <section key={index} className="shadow flex justify-between 
          items-start p-4 rounded-lg bg-black text-white">
            <div className="text-xl font-semibold">
                <h1 
                  className='text-neutral-300'>
                  {process.title}
                </h1>
                <span>
                  {process.number}
                </span>
            </div>
            <process.icon className={process.styles}/> 
          </section>
        )
        })}
      </section>
    </main>
  )
}
