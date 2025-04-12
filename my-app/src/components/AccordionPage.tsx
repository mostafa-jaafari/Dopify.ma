'use client';
import { Why_You_Choose_Us } from '@/GlobalLinks';
import { ChevronDown, ChevronUp } from 'lucide-react';
import React, { useState } from 'react'


export default function AccordionPage() {
    const [ActiveAccording, setActiveAccording] = useState<number | null>(null);
    const toggleAccordion = (index: number | null) => {
      setActiveAccording(ActiveAccording ? null : index);
    };
    return (
    <main className='w-full'>
        <section className='space-y-2 p-4 rounded-lg border border-neutral-200 shadow-lg'>
            {Why_You_Choose_Us.map((item, index) => {
                return (
                    <details 
                        key={index}
                        onClick={() => toggleAccordion(index)}
                        className={`border border-neutral-300 p-4 rounded-lg
                            ${ActiveAccording === index && "bg-neutral-100 border-neutral-400 text-violet-600 transition-all duration-300"}`}
                    >
                        <summary 
                          className='list-none text-neutral-700 text-xl cursor-pointer font-semibold w-full flex items-center justify-between'>
                            {item.summary}
                            {ActiveAccording === index ? (<ChevronDown />) : (<ChevronUp />)}
                            </summary>
                        <p className='para-color pt-3 px-8'>{item.paragraph}</p>
                    </details>
                )
            })}
        </section>
    </main>
  )
}
