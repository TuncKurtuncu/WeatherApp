import Header from '@/Components/Header';
import axios from 'axios';



export async function getServerSideProps(context) {
    const { city } = context.params;
    const API_KEY = process.env.WEATHER_API_KEY;

    try {
        const res = await axios.get("https://api.openweathermap.org/data/2.5/forecast", {
            params: {
                q: city,
                appid: API_KEY,
                units: "metric",
            },
        });

        // Veriyi günlere göre grupla
        const forecastData = res.data.list.reduce((acc, item) => {
            const date = item.dt_txt.split(" ")[0]; // Sadece tarih kısmı
            if (!acc[date]) acc[date] = [];
            acc[date].push(item);
            return acc;
        }, {});

        return {
            props: {
                city: res.data.city,
                forecastData,
            },
        };
    } catch (error) {
        console.error("Tahmin verisi alınamadı:", error.message);
        return { notFound: true };
    }
}


export default function CityDetails({ forecastData, city }) {
    if (!forecastData || !city) return <div>Veri bulunamadı.</div>;

    const { name } = city;

    const todayDate = Object.keys(forecastData)[0]; // Bugünün tarihi
    const todayForecast = forecastData[todayDate];
    const otherDays = Object.entries(forecastData).filter(([date]) => date !== todayDate);

    const getBgWeather = (main) => {
        switch (main.toLowerCase()) {
            case "rain":
            case "drizzle":
                return "/Rainy.png";
            case "clear":
                return "/Sunny.png";
            case "cloud":
            case "clouds":
                return "/PartlyCloudy.png";
            case "snow":
                return "/Snow.png";
            case "thunderstorm":
                return "/Thunder.png";
            default:
                return "/MainImg.png";
        }
    };

    const backgroundImage = getBgWeather(todayForecast[0].weather[0].main);

    return (
        <>
            <header className="sticky top-0 z-50">
                <Header />
            </header>

            <main
                className="min-h-screen bg-cover bg-center bg-no-repeat py-10 px-4 "
                style={{ backgroundImage: `url('${backgroundImage}')` }}
            >
                <div className="max-w-5xl mx-auto bg-white/40 p-6 rounded-xl shadow-lg">
                    <h1 className="text-3xl text-gray-800 font-bold text-center mb-6">
                        {name}
                    </h1>

                    {/* BUGÜNÜN DETAYLI SAATLİK VERİLERİ */}
                    <section className="mb-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {todayForecast.map((item) => (
                                <div key={item.dt} className="group [perspective:1000px]">
                                    <div className="relative w-full h-60 duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">

                                        {/* Ön Yüz */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-blue-200 via-white to-blue-100 shadow-lg rounded-xl
                                         p-5 text-center flex flex-col justify-center items-center space-y-2 backface-hidden">
                                            <p className="text-sm font-semibold text-gray-700">
                                                {item.dt_txt.split(" ")[1].slice(0, 5)}
                                            </p>

                                            <img
                                                src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                                                alt={item.weather[0].description}
                                                className="w-20 h-20"
                                            />

                                            <p className="text-xl font-bold text-blue-900">
                                                {Math.round(item.main.temp)}°C
                                            </p>

                                            <p className="capitalize text-gray-600 text-sm tracking-wide">
                                                {item.weather[0].description}
                                            </p>
                                        </div>


                                        {/* Arka Yüz */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-white to-blue-100 shadow-lg p-6 rounded-xl text-center 
                                        [transform:rotateY(180deg)] backface-hidden flex flex-col justify-center space-y-2">
                                            <p className="text-blue-800 font-semibold text-sm">
                                                🌬️ Wind Speed: <span className="font-normal text-gray-700">{item.wind.speed} m/s</span>
                                            </p>
                                            <p className="text-blue-800 font-semibold text-sm">
                                                💧 Humidity: <span className="font-normal text-gray-700">{item.main.humidity}%</span>
                                            </p>
                                            <p className="text-blue-800 font-semibold text-sm">
                                                ☔ Precipitation: <span className="font-normal text-gray-700">{Math.round(item.pop * 100)}%</span>
                                            </p>
                                            {item.rain?.["3h"] && (
                                                <p className="text-blue-800 font-semibold text-sm">
                                                    🌧️ Rain Volume: <span className="font-normal text-gray-700">{item.rain["3h"]} mm </span>
                                                </p>
                                            )}
                                        </div>

                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* DİĞER GÜNLERİN ÖZETİ */}
                    <section>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {otherDays.map(([date, items]) => {
                                const sampleHour = items.find((i) => i.dt_txt.includes("12:00")) || items[0];

                                return (
                                    <div
                                        key={date}
                                        className="bg-gradient-to-br from-white via-blue-100 to-blue-200 shadow-lg p-5 rounded-xl flex justify-between items-center
                                         hover:scale-[1.02] hover:shadow-xl transition duration-300"
                                    >
                                        <div className="flex flex-col space-y-1">
                                            <p className="text-lg font-semibold text-gray-800">{date}</p>
                                            <p className="text-sm text-gray-600 capitalize tracking-wide">
                                                {sampleHour.weather[0].description}
                                            </p>
                                            <p className="text-xl font-bold text-blue-800">
                                                {Math.round(sampleHour.main.temp)}°C
                                            </p>
                                        </div>
                                        <img
                                            src={`https://openweathermap.org/img/wn/${sampleHour.weather[0].icon}@2x.png`}
                                            alt={sampleHour.weather[0].description}
                                            className="w-20 h-20"
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </section>

                </div >
            </main >
        </>
    );
}
