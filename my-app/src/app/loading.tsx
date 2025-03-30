import React from 'react'

export default function loading() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div
        className="w-16 h-16 border-t-4 border-solid border-[#009eb3] border-t-transparent rounded-full animate-spin"
        style={{ borderTopColor: '#009eb3' }}
      ></div>
    </div>
  )
}
