import DashboardWelcome from '@/components/DashboardWelcome'
import QuickSetupGuide from '@/components/QuickSetupGuide'
import StatusCard from '@/components/StatusCard'
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
            <StatusCard
              key={index}
              CLASSNAME={process.styles} 
              LABEL={process.title}
              NUMBER={process.number}
              ICON={process.icon}
              />
          )
        })}
      </section>
    </main>
  )
}
