import Image from 'next/image'
import React from 'react'
import bird from '../../../public/ai-logo.png'
import { Button } from '@/components/ui/button'
import { UserButton } from '@clerk/nextjs'

function Header() {
  return (
    <div className='p-3 px-5 flex items-center justify-between shadow-md'>
      <div className='flex gap-3 items-center'>
        <Image src={bird} alt='bird' width={30} height={30} />
        <h2 className='font-bold text-xl '>Ai short Video</h2>
      </div>
      <div className='flex gap-3 items-center'>
        <Button variant="default">Dashboad</Button>
        <UserButton/>
      </div>
    </div>
  )
}

export default Header
