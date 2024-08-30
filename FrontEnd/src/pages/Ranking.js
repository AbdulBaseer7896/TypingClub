import React, { useState, useEffect } from 'react';
import Navbar from '../components/NavBar';

const Ranking = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/Ranking');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="container mx-auto py-10">
        <h2 className="text-4xl font-semibold text-[#555555] text-center mb-6">
          See How You Stack Up Against Others!
        </h2>
        <div className="bg-white shadow-2xl rounded-lg overflow-hidden border-[#c59438] border-2">
          {loading ? (
            <p className="text-center py-10">Loading...</p>
          ) : error ? (
            <p className="text-center py-10 text-red-500">Error: {error}</p>
          ) : (
            <table className="min-w-full bg-white">
              <thead>
                <tr className='shadow-2xl'>
                  <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-xl text-center font-bold text-[#c59438] uppercase tracking-wider">Ranking #</th>
                  <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-xl text-center font-bold text-[#c59438] uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-xl text-center font-bold text-[#c59438] uppercase tracking-wider">Duration</th>
                  <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-xl text-center font-bold text-[#c59438] uppercase tracking-wider">Accuracy</th>
                  <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-xl text-center font-bold text-[#c59438] uppercase tracking-wider">Typing Speed</th>
                </tr>
              </thead>
              <tbody>
                {data && data.map((item, index) => (
                  <tr key={index} className="bg-gray-50 hover:bg-gray-100 transition duration-150 hover:text-[#c59438]">
                    <td className="px-6 py-4 whitespace-no-wrap text-xl font-bold text-center leading-5 text-gray-900 hover:text-[#c59438]">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap text-lg text-center leading-5 text-gray-900 hover:text-[#c59438]">
                      {item.userName}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap text-lg text-center leading-5 text-gray-900 hover:text-[#c59438]">
                      {item.elapsedTime}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap text-lg text-center leading-5 text-gray-900 hover:text-[#c59438]">
                      {item.accuracy}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap font-bold text-xl text-center leading-5 text-gray-900 hover:text-[#c59438]">
                      {item.typingSpeed}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default Ranking;
