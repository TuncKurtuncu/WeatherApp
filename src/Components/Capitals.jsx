import Link from "next/link";

export default function Capitals({ weatherData }) {
  if (!weatherData || weatherData.length === 0) {
    return (
      <div className="text-center text-red-500 mt-10">
        Veri yüklenemedi.
      </div>
    );
  }

  const getVideoByWeather = (main) => {
    switch (main.toLowerCase()) {
      case "clear":
        return "/Sunny.mp4";
      case "rain":
      case "drizzle":
        return "/Rainy.mp4";
      case "snow":
        return "/Snowy.mp4";
      case "clouds":
        return "/Cloudy.mp4";
      case "thunderstorm":
        return "/Storm.mp4";
      default:
        return "/Default.mp4";
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
      {weatherData.map((cityWeather) => {
        const video = getVideoByWeather(cityWeather.weather[0].main);
        const temperature = Math.round(cityWeather.main.temp);

        return (
          <Link
            key={cityWeather.id}
            href={`/details/${cityWeather.name}`}
            className="block"
          >
            <div className="relative perspective-[1000px]">
              <div className="relative w-full h-80 rounded-xl shadow-lg overflow-hidden">

                {/* Ön Yüz */}
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-white backface-hidden">
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover z-0"
                  >
                    <source src={video} type="video/mp4" />
                  </video>

                  <div className="relative z-10 bg-black/50 px-4 py-6 rounded-lg text-center">
                    <h2 className="text-2xl font-bold">{cityWeather.name}</h2>
                    <p className="text-4xl font-semibold mt-1">{temperature}°C</p>
                  </div>
                </div>

                

              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
