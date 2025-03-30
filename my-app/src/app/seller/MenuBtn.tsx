'use client';
import { AlignLeft } from 'lucide-react'
import React, { useContext } from 'react'
import { StateContext } from './StateProvider';



export default function MenuBtn() {
    const context = useContext(StateContext);
    if(!context){
        return null;
    }
    const { IsOpen, setIsOpen } = context;

    return (
    <AlignLeft 
        onClick={() => setIsOpen(!IsOpen)}
        className='cursor-pointer'
    />
  )
}
