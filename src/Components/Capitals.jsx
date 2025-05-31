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
            className="block group"
          >
            <div className="relative w-full h-80 rounded-2xl overflow-hidden shadow-2xl transform transition duration-300 group-hover:scale-[1.02] group-hover:shadow-blue-200">
              {/* Video Background */}
              <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              >
                <source src={video} type="video/mp4" />
              </video>

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/30  z-10" />

              {/* Content */}
              <div className="relative z-20 flex flex-col justify-center items-center h-full text-white text-center px-4">
                <div className="bg-white/20 backdrop-blur-md p-6 rounded-xl w-full max-w-xs">
                  <h2 className="text-2xl font-bold tracking-wide">{cityWeather.name}</h2>
                  <p className="text-5xl font-extrabold mt-2">{temperature}°C</p>
                  <p className="mt-1 text-sm font-medium capitalize">
                    {cityWeather.weather[0].description}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>

  );
}
