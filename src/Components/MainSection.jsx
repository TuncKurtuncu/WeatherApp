import React, { useState } from 'react';
import img from '../Assets/MainImg.png';
import logo from '../Assets/WeatherLogo.png';
import Image from 'next/image';
import WeatherSearch from '../Components/WeatherSearch';


function MainSection() {
    

    return (
        <div className="relative w-full">
            {/* Arka Plan Görseli */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={img}
                    alt="Background"
                    fill          
                    style={{ objectFit: "cover" }}  
                    className="w-full h-full"
                />
            </div>

            {/* İçerik + Özellikler Container */}
            <main className="relative z-10 flex flex-col items-center justify-center">
                {/* İçerik Kutusu */}
                <section className="backdrop-blur-lg bg-white/20 p-8 rounded-2xl shadow-xl text-center w-[90%] max-w-lg mx-auto mt-10 md:mt-24">
                    {/* Logo */}
                    <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden">
                        <Image src={logo} alt="Logo" width={96} height={96} />
                    </div>

                    {/* Başlık */}
                    <header className="text-3xl font-bold mb-2">
                        <h1>Welcome to </h1>
                        <span className="text-indigo-500">WeatherSphere</span>
                    </header>
                    <p className="text-gray-700 mb-6">
                        Your comprehensive guide to the world's weather.
                    </p>

                    {/* Arama Kutusu */}
                    <div className="flex items-center justify-center gap-2">
                        <WeatherSearch/> 
                    </div>
                </section>

                {/* Alt Özellik Kutuları */}
                <section className="flex flex-col md:flex-row items-center justify-center w-full max-w-6xl px-6 py-12 gap-6 md:mt-12 mt-0">
                    {/* Kutu 1 */}
                    <article className="hidden md:block bg-white/30 backdrop-blur-lg rounded-xl shadow-md p-6 text-center  justify-items-center w-full md:w-1/3">
                        <div className="text-indigo-500 text-3xl mb-2">
                            <i className="fas fa-bolt">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
                                </svg>
                            </i>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Real-time Updates</h3>
                        <p className="text-md text-gray-700">
                            Get instant weather data for any location worldwide.
                        </p>
                    </article>

                    {/* Kutu 2 */}
                    <article className="hidden md:block bg-white/30 backdrop-blur-lg rounded-xl shadow-md p-6 text-center justify-items-center w-full md:w-1/3">
                        <div className="text-indigo-500 text-3xl mb-2">
                            <i className="fas fa-calendar-alt">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                                </svg>
                            </i>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Extended Forecasts</h3>
                        <p className="text-md text-gray-700">
                            Plan your week with detailed multi-day forecasts.
                        </p>
                    </article>

                    {/* Kutu 3 */}
                    <article className="hidden md:block bg-white/30 backdrop-blur-lg rounded-xl shadow-md p-6  justify-items-center text-center w-full md:w-1/3">
                        <div className="text-indigo-500 text-3xl mb-2">
                            <i className="fas fa-map-marked-alt">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z" />
                                </svg>
                            </i>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Interactive Maps</h3>
                        <p className="text-md text-gray-700">
                            Visualize weather patterns with dynamic maps.
                        </p>
                    </article>
                </section>
            </main>
        </div>

    );
}

export default MainSection;
