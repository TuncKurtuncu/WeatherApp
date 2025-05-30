import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const [city, setCity] = useState('');
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim() === '') return;
    router.push(`/details/${city.trim()}`);
  };

  return (
    <div className="flex flex-col items-center justify-center ">
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="City Name"
          className="border border-gray-300 rounded px-4 py-2 w-64 text-center"
        />
        <button
          type="submit"
          className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Search
        </button>
      </form>
    </div>
  );
}
