export default function Capitals({ weatherData }) {
  if (!weatherData || weatherData.length === 0) {
    return (
      <div className="text-center text-red-500 mt-10">
        Veri yüklenemedi.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {weatherData.map((cityWeather) => {
        const iconCode = cityWeather.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

        return (
          <div
            key={cityWeather.id}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow duration-300 flex flex-col items-center"
          >
            <h2 className="text-xl font-semibold mb-2 text-gray-800">{cityWeather.name}</h2>

            <img
              src={iconUrl}
              alt={cityWeather.weather[0].description}
              className="w-20 h-20 mb-2"
              loading="lazy"
            />

            <p className="capitalize text-gray-600 mb-4 text-center">
              {cityWeather.weather[0].description}
            </p>

            <p className="text-3xl font-bold text-blue-600 mb-4">
              {Math.round(cityWeather.main.temp)} °C
            </p>

            <div className="flex justify-between w-full text-sm text-gray-500">
              <div>
                <span>Humidity: </span>
                <span>{cityWeather.main.humidity}%</span>
              </div>
              <div>
                <span>Wind Speed: </span>
                <span>{Math.round(cityWeather.wind.speed)} m/s</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
