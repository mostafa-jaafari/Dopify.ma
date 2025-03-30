'use client';
import React, { useRef, useState } from 'react'
import UITestimonialCard from "@/components/UITestimonialCard";
import { Users_Reviews } from '@/GlobalLinks';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Testimonials() {
    const ScrollRef = useRef<HTMLDivElement | null>(null);
    const [currentScroll, setCurrentScroll] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(0);

    const ScrollRight = () => {
        if(ScrollRef.current){
            // If at the last card, reset to first
            if (currentIndex === Users_Reviews.length - 1) {
                ScrollRef.current.scrollTo({
                    left: 0, 
                    behavior: 'smooth'
                });
                setCurrentIndex(0);
                setCurrentScroll(0);
                return;
            }

            // Calculate the full width of the container
            const containerWidth = ScrollRef.current.clientWidth;
            
            // Calculate new scroll position
            const newScrollPosition = currentScroll + containerWidth;
            
            ScrollRef.current.scrollTo({
                left: newScrollPosition, 
                behavior: 'smooth'
            });
            
            // Update current scroll and index states
            setCurrentScroll(newScrollPosition);
            setCurrentIndex(prev => prev + 1);
        }
    }

    const ScrollLeft = () => {
        if(ScrollRef.current){
            // If at the first card, go to last card
            if (currentIndex === 0) {
                const lastCardIndex = Users_Reviews.length - 1;
                const containerWidth = ScrollRef.current.clientWidth;
                const newScrollPosition = containerWidth * lastCardIndex;
                
                ScrollRef.current.scrollTo({
                    left: newScrollPosition, 
                    behavior: 'smooth'
                });
                
                setCurrentIndex(lastCardIndex);
                setCurrentScroll(newScrollPosition);
                return;
            }

            // Calculate the full width of the container
            const containerWidth = ScrollRef.current.clientWidth;
            
            // Calculate new scroll position
            const newScrollPosition = Math.max(0, currentScroll - containerWidth);
            
            ScrollRef.current.scrollTo({
                left: newScrollPosition, 
                behavior: 'smooth'
            });
            
            // Update current scroll and index states
            setCurrentScroll(newScrollPosition);
            setCurrentIndex(prev => prev - 1);
        }
    }

    return (
    <div className="relative w-full lg:w-3/4 px-6 ">
        <div className="absolute top-1/3 left-0 w-full z-20 flex justify-between lg:px-30 md:px-20 px-10">
            <ChevronLeft onClick={ScrollLeft} size={30} className={`z-50 flex-shrink-0 text-white rounded-full cursor-pointer 
                ${currentIndex !== 0 ? 'bg-yellow-500' : 'bg-neutral-700'}`}/>
            <ChevronRight onClick={ScrollRight} size={30} className={`z-50 flex-shrink-0 text-white rounded-full cursor-pointer
                ${currentIndex !== Users_Reviews.length - 1 ? 'bg-yellow-500' : 'bg-neutral-500'}`}/>
        </div>
        <div ref={ScrollRef} className="full flex overflow-x-scroll no-scrollbar">
            {Users_Reviews.map((review, index) => {
            return (
                <UITestimonialCard 
                    key={index}
                    IMAGE={review.image}
                    RATING={review.rating}
                    DESCRIPTION={review.description}
                    NAME={review.name}
                    DATE={review.date}
                />
            )
            })}
        </div>
        <div className='absolute bottom-2 left-0 w-full flex space-x-1 justify-center'>
          {Array(Users_Reviews.length).fill(0).map((_,index) => {
            return (
              <span 
                key={index}
                className={`rounded-full border transition-all duration-300 
                ${currentIndex === index ? "w-8 h-3 border-yellow-600 bg-transparent" : "w-3 h-3 border-neutral-600 bg-neutral-700"}`}
                ></span>
            )
          })}
        </div>
    </div>
  )
}