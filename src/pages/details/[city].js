import Header from '@/Components/Header';
import axios from 'axios';
import { useRouter } from 'next/router';


export async function getServerSideProps(context) {
    const { city } = context.params;
    const API_KEY = process.env.WEATHER_API_KEY;

    try {
        const res = await axios.get("https://api.openweathermap.org/data/2.5/weather", {
            params: {
                q: city,
                appid: API_KEY,
                units: "metric",
            },
        });

        return {
            props: {
                weather: res.data,
            },
        };
    } catch (error) {
        console.error("Detay verisi alınamadı:", error.message);
        return {
            notFound: true,
        };
    }
}

export default function CityDetails({ weather }) {
    const router = useRouter();

    if (!weather) {
        return <div>Veri bulunamadı.</div>;
    }

    const {
        name,
        main: { temp, feels_like, temp_min, temp_max, humidity, pressure },
        wind: { speed },
        weather: [weatherInfo],
        sys: { country },

    } = weather;
    const weatherCondition = weatherInfo.main.toLowerCase();

    let backgroundImage = '/default.png';

    if (weatherCondition.includes('rain')) {
        backgroundImage = '/Rainy.png';
    } else if (weatherCondition.includes('clear')) {
        backgroundImage = '/Sunny.png';
    } else if (weatherCondition.includes('cloud')) {
        backgroundImage = '/PartlyCloudy.png';
    } else if (weatherCondition.includes('snow')) {
        backgroundImage = '/Snow.png';
    } else {
        backgroundImage = '/default.png';
    }

    const iconUrl = `https://openweathermap.org/img/wn/${weatherInfo.icon}@4x.png`;

    return (
        <>
            <header className="sticky top-0 z-50">
                <Header />
            </header>

            <main
                className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center"
                style={{ backgroundImage: `url('${backgroundImage}')` }}
            >


                <section className="max-w-3xl w-full mx-auto p-6 mt-10 bg-white/45 bg-opacity-80 shadow-xl rounded-xl">
                    <h1 className="text-4xl font-bold text-center mb-4">{name}, {country}</h1>

                    <div className="flex flex-col items-center">
                        <img src={iconUrl} alt={weatherInfo.description} className="w-32 h-32" />
                        <p className="capitalize text-xl text-gray-600">{weatherInfo.description}</p>
                        <p className="text-5xl font-bold text-blue-700 mt-2">{Math.round(temp)}°C</p>
                    </div>

                    <div className="mt-8 grid grid-cols-1 justify-items-center sm:grid-cols-2 gap-6 text-lg">
                        <div>
                            <p><span className="font-semibold">Felt Temperature:</span> {Math.round(feels_like)} °C</p>
                            <p><span className="font-semibold">Min Temp:</span> {Math.round(temp_min)} °C</p>
                            <p><span className="font-semibold">Max Temp:</span> {Math.round(temp_max)} °C</p>
                        </div>

                        <div>
                            <p><span className="font-semibold">Humidity:</span> {humidity}%</p>
                            <p><span className="font-semibold">Pressure:</span> {pressure} hPa</p>
                            <p><span className="font-semibold">Wind Speed:</span> {Math.round(speed)} m/s</p>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
