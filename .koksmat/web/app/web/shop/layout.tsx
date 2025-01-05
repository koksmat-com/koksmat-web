import React from 'react'

export default function Route({ children }: { children: React.ReactNode }) {
  return (

    <div className='flex w-full h-screen'>
      <div className='hidden  md:visible  w-[200px] bg-slate-200'></div>
      <div className='grow  w-full'>{children}</div>
    </div>

  )
}
