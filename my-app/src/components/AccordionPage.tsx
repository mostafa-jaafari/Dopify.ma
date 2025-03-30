'use client';
import { Why_You_Choose_Us } from '@/GlobalLinks';
import { ChevronDown } from 'lucide-react';
import React, { useState } from 'react'


export default function AccordionPage() {
    const [ActiveAccording, setActiveAccording] = useState<number | null>(null);
    const toggleAccordion = (index: number | null) => {
      setActiveAccording(ActiveAccording === index ? null : index);
    };
    return (
    <main className='w-full'>
        <section className='bg-neutral-900 space-y-2 p-4 rounded-lg border border-neutral-700'>
            {Why_You_Choose_Us.map((item, index) => {
                return (
                    <details 
                        key={index}
                        className={`border border-neutral-700 p-4 rounded-lg
                            ${ActiveAccording === index && "bg-neutral-800 border-neutral-300 transition-all duration-300"}`}
                    >
                        <summary 
                          onClick={() => toggleAccordion(index)}
                          className='list-none text-xl cursor-pointer font-semibold w-full flex items-center justify-between'>
                            {item.summary}
                            <ChevronDown 
                                className={`${ActiveAccording === index && "rotate-180 transition-all"}`}/></summary>
                        <p className='para-color pt-3 px-8'>{item.paragraph}</p>
                    </details>
                )
            })}
        </section>
    </main>
  )
}
