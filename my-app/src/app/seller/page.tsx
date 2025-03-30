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
          <section key={index} className="bg-gradient-to-t from-neutral-900/50 to-[#000000] hover:from-[#000000]
            flex justify-between items-start p-4 border border-neutral-800/50 
            rounded-lg">
            <div className="text-xl font-semibold">
                <h1 className={process.styles}>{process.title}</h1>
                <span className={process.styles}>{process.number}</span>
            </div>
            <process.icon className='text-neutral-700'/> 
          </section>
        )
        })}
      </section>
    </main>
  )
}
