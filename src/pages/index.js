import axios from 'axios';
import Header from '@/components/Header';
import MainSection from '@/components/MainSection';
import Capitals from '@/components/Capitals';

export async function getServerSideProps() {
  const capitals = ["Bern", "Amsterdam", "Ankara", "Tokyo", "Oslo", "Berlin"];
  const API_KEY = process.env.WEATHER_API_KEY;

  if (!API_KEY) {
    console.error("API key bulunamadı.");
    return { props: { weatherData: [] } };  
  }

  try {
    const weatherData = await Promise.all(
      capitals.map(async (city) => {
        try {
          const res = await axios.get("https://api.openweathermap.org/data/2.5/weather", {
            params: {
              q: city,
              appid: API_KEY,
              units: "metric",
            },
          });
          return res.data;
        } catch (err) {
          console.error(`API isteği başarısız: ${city}`, err.response?.data || err.message);
          return null;
        }
      })
    );

    const filteredData = weatherData.filter(Boolean);

    if (filteredData.length === 0) {
      console.warn("Hiç veri alınamadı.");
    }

    return { props: { weatherData: filteredData } };
  } catch (error) {
    console.error("Genel hata:", error);
    return { props: { weatherData: [] } };
  }
}

export default function Index ({ weatherData }) {

  return (
    <main >
      <header className="sticky top-0 z-50">
        <Header />
      </header>
      <div>
        <section>
          <MainSection />
        </section>
      </div>
      <section className="mt-10 mx-auto max-w-7xl px-6 ">
        <h1 className="text-3xl font-bold mb-6 text-center">CAPITALS</h1>
        <Capitals weatherData={weatherData} />
      </section>
    </main>
  );
}
