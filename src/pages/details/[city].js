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
            <header className="top-0 z-50">
                <Header />
            </header>

            <main
                className="min-h-screen bg-cover bg-center bg-no-repeat py-12 px-6"
                style={{ backgroundImage: `url('${backgroundImage}')` }}
            >
                <div className="max-w-6xl mx-auto bg-white/60 backdrop-blur-md p-8 rounded-2xl shadow-xl">
                    <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-10 select-none">
                        {name}
                    </h1>

                    {/* BUGÜNÜN DETAYLI SAATLİK VERİLERİ */}
                    <section className="mb-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {todayForecast.map((item) => (
                                <div key={item.dt} className="group [perspective:1000px]">
                                    <div className="relative w-full h-40 duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">

                                        {/* Ön Yüz */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-blue-200 via-white to-blue-100 shadow-lg rounded-xl
            p-3 text-center flex flex-col justify-center items-center space-y-1 backface-hidden">
                                            <p className="text-xs font-semibold text-gray-700">
                                                {item.dt_txt.split(" ")[1].slice(0, 5)}
                                            </p>

                                            <img
                                                src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                                                alt={item.weather[0].description}
                                                className="w-14 h-14"
                                                loading="lazy"
                                                draggable={false}
                                            />

                                            <p className="text-lg font-bold text-blue-900">
                                                {Math.round(item.main.temp)}°C
                                            </p>

                                            <p className="capitalize text-gray-600 text-xs tracking-wide">
                                                {item.weather[0].description}
                                            </p>
                                        </div>

                                        {/* Arka Yüz */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-white to-blue-100 shadow-lg p-3 rounded-xl text-center 
            [transform:rotateY(180deg)] backface-hidden flex flex-col justify-center space-y-1">
                                            <p className="text-blue-800 font-semibold text-xs">
                                                🌬️ Wind Speed: <span className="font-normal text-gray-700">{item.wind.speed} m/s</span>
                                            </p>
                                            <p className="text-blue-800 font-semibold text-xs">
                                                💧 Humidity: <span className="font-normal text-gray-700">{item.main.humidity}%</span>
                                            </p>
                                            <p className="text-blue-800 font-semibold text-xs">
                                                ☔ Precipitation: <span className="font-normal text-gray-700">{Math.round(item.pop * 100)}%</span>
                                            </p>
                                            {item.rain?.["3h"] && (
                                                <p className="text-blue-800 font-semibold text-xs">
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
                        <h2 className="text-xl font-semibold text-blue-800 mb-4">Upcoming Days</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {otherDays.map(([date, items]) => {
                                const sampleHour = items.find((i) => i.dt_txt.includes("12:00")) || items[0];

                                return (
                                    <div
                                        key={date}
                                        tabIndex={0}
                                        className="group perspective [perspective:1000px]"
                                    >
                                        <div className="relative w-full h-32 duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] group-focus:[transform:rotateY(180deg)] rounded-xl shadow-lg cursor-pointer select-none">

                                            {/* Ön Yüz */}
                                            <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-100 to-blue-200 rounded-xl p-4 flex justify-between items-center backface-hidden">
                                                <div className="flex flex-col space-y-1">
                                                    <p className="text-md font-semibold text-gray-900">{date}</p>
                                                    <p className="text-xs text-gray-700 capitalize tracking-wide font-medium">
                                                        {sampleHour.weather[0].description}
                                                    </p>
                                                    <p className="text-xl font-bold text-blue-900">
                                                        {Math.round(sampleHour.main.temp)}°C
                                                    </p>
                                                </div>
                                                <img
                                                    src={`https://openweathermap.org/img/wn/${sampleHour.weather[0].icon}@2x.png`}
                                                    alt={sampleHour.weather[0].description}
                                                    className="w-16 h-16"
                                                    loading="lazy"
                                                    draggable={false}
                                                />
                                            </div>

                                            {/* Arka Yüz */}
                                            <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-white rounded-xl p-4 flex flex-col justify-center space-y-2 shadow-md text-center
              [transform:rotateY(180deg)] backface-hidden select-none">
                                                <p className="text-blue-900 font-semibold text-xs">
                                                    🌬️ Wind Speed:{" "}
                                                    <span className="font-normal text-gray-800">{sampleHour.wind.speed} m/s</span>
                                                </p>
                                                <p className="text-blue-900 font-semibold text-xs">
                                                    💧 Humidity:{" "}
                                                    <span className="font-normal text-gray-800">{sampleHour.main.humidity}%</span>
                                                </p>
                                                <p className="text-blue-900 font-semibold text-xs">
                                                    ☔ Precipitation:{" "}
                                                    <span className="font-normal text-gray-800">{Math.round(sampleHour.pop * 100)}%</span>
                                                </p>
                                                {sampleHour.rain?.["3h"] && (
                                                    <p className="text-blue-900 font-semibold text-xs">
                                                        🌧️ Rain Volume:{" "}
                                                        <span className="font-normal text-gray-800">{sampleHour.rain["3h"]} mm</span>
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </section>


                </div>
            </main>

        </>
    );
}
