import { LogOut, User2Icon } from 'lucide-react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  

import { Avatar } from '@/components/ui/avatar'
import { useNavigate } from "react-router-dom"
import { Button } from './ui/button'
import { Link as RouterLink } from "react-router-dom"
import { useEffect, useState } from 'react'
import { API } from '@/services/api'

export default function Heading() {

    const navigate = useNavigate()
    const [imageProfile, setImageProfile] = useState<string | null>(null)

    const handleLogout = () => {
        localStorage.removeItem('token')
        navigate('/auth/login',{replace: true})
    }

    useEffect(() => {
        API.get('/user')
            .then((res) => setImageProfile(res.data.message.image))
    }, [])
    

    return (
        <div className='flex justify-between items-center'>
            <div>
                <h1 className="font-semibold text-xl">Notes App</h1>
                <p className="mt-1 text-gray-500">
                    A simple notes app built with React, Next.js, and MongoDB.
                </p>
            </div>
            <div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant={'outline'} className='rounded-full' size={'icon'}>
                            <Avatar className='h-10 w-10 rounded-full'>
                                { imageProfile ? <img src={`${import.meta.env.VITE_API_URL}/${imageProfile}`} alt="user" className="w-10 h-10 rounded-full object-cover" /> : (
                                    <div className='h-full w-full flex items-center justify-center'>
                                        <User2Icon width={18} />
                                    </div>
                                ) }
                            </Avatar>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='end'>
                        <DropdownMenuLabel> My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild> 
                            <RouterLink to="/profile" >
                                <User2Icon width={18} /> Profile 
                            </RouterLink>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleLogout}> <LogOut width={18} /> Log out </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

            </div>
        </div>
    )
}
