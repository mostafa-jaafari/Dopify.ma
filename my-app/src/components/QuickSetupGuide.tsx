import { QuickSetupGuide_Links } from '@/GlobalLinks';
import { ChevronRight, CircleCheckBig, Timer } from 'lucide-react'
import Link from 'next/link'
import React from 'react'



export default function QuickSetupGuide() {
  return (
    <main className='overflow-hidden rounded-lg bg-white 
    shadow-lg border border-neutral-300 shadow-lg'>
            <h1 className='p-4 text-xl font-semibold bg-blue-100'>
                Quick Setup Guide
            </h1>
        <ul>
            {QuickSetupGuide_Links.map((guide, index) => {
                return (
                    <Link 
                    key={index}
                    className={`w-full flex items-center justify-between py-4 px-6 border-t 
                        border-neutral-300 hover:bg-neutral-100`}
                    href={guide.href}>
                        <div className='flex items-center gap-4'
                            >
                                {guide.finishprocess ? 
                                (
                                    <CircleCheckBig className={`w-11 h-11 p-1 rounded-full
                                        ${guide.finishprocess ? "bg-green-400/30 text-green-400" : "bg-gray-400/30 text-gray-400"}`}
                                    />
                                ) 
                                :
                                (
                                    <Timer className={`w-11 h-11 p-1 rounded-full
                                        ${guide.finishprocess ? "bg-green-400/30 text-green-400" : "bg-gray-400/30 text-gray-400"}`}
                                    />
                                )}
                            <div>
                                <h1 className={guide.finishprocess && "text-green-400 line-through"}>
                                    {guide.title}
                                </h1>
                                <p className='para-color text-sm'>
                                    {guide.description}
                                </p>
                            </div>
                        </div>
                        <ChevronRight className={guide.finishprocess ? "text-green-400" : "text-neutral-400"}/>
                    </Link>
                )
            })}
        </ul>
    </main>
  )
}

{/* <main className='w-full p-4 rounded-xl border border-[#009eb3]'>
        <h1 className='primary-color font-semibold text-xl'>
            Quick Setup Guide
        </h1>
        <section className='w-full space-y-2 p-4'>
            {QuickSetupGuide_Links.map((guide, index) => {
                return (
                    <Link 
                        key={index}
                        className={`w-full flex items-center justify-between p-2 rounded-lg 
                        ${guide.finishprocess ? "bg-green-400/10 hover:bg-green-400/20" : "bg-neutral-900/60 hover:bg-neutral-900/90"}`}
                        href='/'>
                        <div className='flex items-center gap-4'
                            >
                                {guide.finishprocess ? 
                                (
                                    <CircleCheckBig className={`w-11 h-11 p-1 rounded-full
                                        ${guide.finishprocess ? "bg-green-400/30 text-green-400" : "bg-gray-400/30 text-gray-400"}`}
                                    />
                                ) 
                                :
                                (
                                    <Timer className={`w-11 h-11 p-1 rounded-full
                                        ${guide.finishprocess ? "bg-green-400/30 text-green-400" : "bg-gray-400/30 text-gray-400"}`}
                                    />
                                )}
                            <div>
                                <h1 className={`text-xl ${guide.finishprocess ? "text-green-400 line-through" : ""}`}>
                                    {guide.title}
                                </h1>
                                <p className='para-color text-sm'>
                                    {guide.description}
                                </p>
                            </div>
                        </div>
                        <ChevronRight className={guide.finishprocess ? "text-green-400" : ""}/>
                    </Link>
                )
            })}
        </section>
    </main> */}