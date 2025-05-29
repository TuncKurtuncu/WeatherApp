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

    const { name, country } = city;

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
                    <section className="mb-10 ">

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {todayForecast.map((item) => (
                                <div key={item.dt} className="bg-gradient-to-b from-blue-300 to-white shadow-md p-3 rounded-lg text-center hover:shadow-lg transition">
                                    <p className="font-medium text-gray-800">{item.dt_txt.split(" ")[1].slice(0, 5)}</p>
                                    <img
                                        src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                                        alt={item.weather[0].description}
                                        className="w-16 h-16 mx-auto"
                                    />
                                    <p className="text-lg font-bold text-blue-800">{Math.round(item.main.temp)}°C</p>
                                    <p className="capitalize text-gray-700 text-sm">{item.weather[0].description}</p>
                                    <p className="text-xs text-gray-500">Wind Speed: {item.wind.speed} m/s</p>
                                    <p className="text-xs text-gray-500">Humidity: {item.main.humidity}%</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* DİĞER GÜNLERİN ÖZETİ */}
                    <section >

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
                            {otherDays.map(([date, items]) => {

                                const sampleHour = items.find((i) => i.dt_txt.includes("12:00")) || items[0];
                                return (
                                    <div key={date} className="bg-gradient-to-l from-white to-blue-300 shadow-md p-4 rounded-lg flex items-center gap-4 hover:bg-gray-200 transition">
                                        <div>
                                            <p className="text-md font-semibold text-gray-800">{date}</p>
                                            <p className="text-sm text-gray-600 capitalize">{sampleHour.weather[0].description}</p>
                                            <p className="text-sm text-blue-700 font-bold">{Math.round(sampleHour.main.temp)}°C</p>
                                        </div>
                                        <img
                                            src={`https://openweathermap.org/img/wn/${sampleHour.weather[0].icon}@2x.png`}
                                            alt={sampleHour.weather[0].description}
                                            className="w-16 h-16"
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
