'use client' // For compatibility with onClick listeners, etc for this reason

import {Session} from 'next-auth'
import { signIn, signOut } from 'next-auth/react'
import Image from "next/image"
import Link from 'next/link'
import Cart from './Cart'
import { useCartStore } from '@/store'
import {AiFillShopping} from "react-icons/ai"
import {motion, AnimatePresence} from 'framer-motion'
import DarkLight from './DarkLight'

export default function Nav({user} : Session) {
    const cartStore = useCartStore()
    console.log(cartStore.cart.length)

    return(
        <nav className="flex justify-between items-center py-12">
            <Link className='font-lobster text-xl' href={"/"}>
                <h1>Styled</h1>
            </Link>
            
            <ul className="flex items-center gap-8 ">

                <li onClick={() => cartStore.toggleCart()} 
                className="flex items-center text-3xl relative cursor-pointer">
                    <AiFillShopping />
                    
                    <AnimatePresence>
                        {cartStore.cart.length > 0 && (
                            
                                <motion.span 
                                    animate = {{scale: 1}} 
                                    initial={{scale: 0}} 
                                    exit={{scale:0}}
                                    className="bg-primary text-white text-sm font-bold w-5 h-5 
                                        rounded-full absolute left-4 bottom-4 flex items-center justify-center">
                                    {cartStore.cart.length}
                                </motion.span>
                            
                        )}
                    </AnimatePresence>
                </li>
                <DarkLight />
                {!user && ( // if user is not signed in
                
                    <li className="bg-primary text-white py-2 px-4 rounded-md">
                        <button onClick={() => signIn()}>Sign In</button>
                    </li>
                    
                
                )}
                
                {user && ( // if user is signed in
                // <Link href={"/dashboard"}>
                    <li>
                        <div className="dropdown dropdown-end cursor-pointer">
                            <Image 
                                src={user?.image as string} 
                                alt={user.name as string} 
                                width={36} 
                                height={36} 
                                className="rounded-full"
                                tabIndex={0}
                            />
                            <ul tabIndex={0} 
                                className="dropdown-content menu p-4 
                                space-y-4 shadow bg-base-100 rounded-box w-72"
                            >
                            <Link 
                                className="hover:bg-base-300 p-4 rounded-md"
                                href={"/dashboard"}
                                onClick={() => {
                                    if (document.activeElement instanceof HTMLElement) {
                                        document.activeElement.blur()
                                    }
                                }}
                                >
                                Orders
                            </Link>
                            <li 
                                onClick={() => {
                                    signOut()
                                    if (document.activeElement instanceof HTMLElement) {
                                        document.activeElement.blur()
                                    }
                                }}
                                className="hover:bg-base-300 p-4 rounded-md"
                            >
                                Sign out
                            </li>
                            </ul>
                        </div>
                    </li>
                // </Link>
                    
                // </div>
                )}
            </ul>
            <AnimatePresence>
                {cartStore.isOpen && <Cart />} 
            </AnimatePresence>
        </nav>
    )
}