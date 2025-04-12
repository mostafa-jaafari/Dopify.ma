import React from 'react'

export default function SectionHeader({TITLE, SUBTITLE, IsAnimatedTextTyping}: {IsAnimatedTextTyping?:boolean;TITLE: string; SUBTITLE?: string;}) {
  return (
    <div className='lg:w-3/4 text-center space-y-4'>
        <h1 className='text-5xl font-bold'>{TITLE}</h1>
        <p className={`para-color text-xl ${IsAnimatedTextTyping && 'Animate-Text-Typing'}`}>{SUBTITLE}</p>
    </div>
  )
}
