'use client'
import { CircleUserIcon, FileVideo, PanelsTopLeft, ShieldPlus } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

function SideNav() {
    const MenuOption =[
        {
            id:1,
            name:'Dashboard',
            path:'/dashboard',
            icons:PanelsTopLeft
        },
        {
            id:2,
            name:'Create New',
            path:'/dashboard/create-new',
            icons:FileVideo
        },
        {
            id:3,
            name:'Upgrade',
            path:'/upgrade',
            icons:ShieldPlus
        },
        {
            id:4,
            name:'Account',
            path:'/account',
            icons:CircleUserIcon
        },   
    ]

    const path=usePathname();
    console.log(path)
  return (
    <div className='w-64 h-screen shadow-md p-5'>
        <div className='grid gap-3'>
            {MenuOption.map((item,index)=>(
                <Link href={item.path}>
                <div className={`flex items-center gap-3 p-3 hover:bg-blue-500 hover:text-white rounded-md cursor-pointer
                    ${path==item.path&&'bg-blue-500 text-white'}
                    `}>
                        <item.icons/>
                        <h2>{item.name}</h2>

                    </div>
                </Link>
            ))}

        </div>
    </div>
  )
}

export default SideNav
