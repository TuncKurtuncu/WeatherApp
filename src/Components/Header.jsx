import React, { useState } from 'react';
import Image from 'next/image';
import logo from '../Assets/WeatherLogo.png';
import Link from 'next/link';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';


function Header() {
    const [isOpen, setIsOpen] = useState(false);


    return (
        <header className='sticky top-0 z-50 bg-gray-100 shadow-md text-black px-6 py-2'>
            <div className='flex items-center justify-between flex-wrap'>
                {/* Logo ve başlık */}
                <a href="/" className='flex items-center gap-3'>
                    <Image src={logo} alt="Logo" className='md:w-14 md:h-14 w-16 h-16' />
                    <h1 className='text-2xl font-bold cursor-pointer'>
                        <span className='text-blue-500 drop-shadow-[1px_1px_0_#000]'>Weather</span>
                        <span className='text-indigo-500 drop-shadow-[1px_1px_0_#000]'>Sphere</span>
                    </h1>
                </a>

                {/* Navigasyon */}
                <nav className='hidden md:flex gap-6 lg:gap-10 xl-gap-16 text-sm lg:text-base font-medium hover:text-blue-400' aria-label="Main navigation">
                    <ul className='flex gap-6 lg:gap-10 xl-gap-16'>
                        <li><Link href="/">Home</Link></li>
                    </ul>
                </nav>

                {/* Kullanıcı butonları */}
                <div className='flex items-center gap-4'>
                    <div className="hidden md:flex gap-3 font-medium" role="group" aria-label="Authentication links">
                        <Link href="/" className="px-3 py-1 border w-fit border-gray-500 text-black rounded-md hover:bg-gray-500 hover:text-white transition">Login</Link>
                        <Link href="/" className="px-3 py-1 border w-fit border-indigo-500 bg-indigo-500 text-white rounded-md hover:bg-white hover:text-indigo-500 transition">Register</Link>
                    </div>

                    {/* Mobil Menü Butonu */}
                    <button onClick={() => setIsOpen(!isOpen)} className='md:hidden' aria-expanded={isOpen} aria-controls="mobile-menu" aria-label="Toggle mobile menu">
                        {isOpen ? (
                            <XMarkIcon className="w-6 h-6 text-black" />
                        ) : (
                            <Bars3Icon className="w-6 h-6 text-black" />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobil Menü */}
            {isOpen && (
                <nav
                    id="mobile-menu"
                    className='flex flex-col gap-4 items-center justify-center z-40 fixed inset-0 bg-gray-200'
                    aria-label="Mobile navigation"
                >
                    <button className='absolute top-4 right-6 text-black text-3xl' onClick={() => setIsOpen(false)} aria-label="Close mobile menu">
                        <XMarkIcon className="w-6 h-6 text-black" />
                    </button>
                    <ul>
                        <li>
                            <Link href='/' onClick={() => setIsOpen(false)}>Home</Link>
                        </li>
                    </ul>
                </nav>
            )}
        </header>

    )
}

export default Header
