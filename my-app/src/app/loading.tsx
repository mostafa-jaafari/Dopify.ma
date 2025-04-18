import React from 'react'

export default function loading() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div
        className="w-16 h-16 border-t-4 border-solid 
        border-[#000000] border-t-transparent 
        rounded-full animate-spin"
        style={{ borderTopColor: '#000000' }}
      ></div>
    </div>
  )
}
