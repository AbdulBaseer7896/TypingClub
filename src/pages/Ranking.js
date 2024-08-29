import React from 'react';
import Navbar from '../components/NavBar';

const Ranking = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="container mx-auto py-10">
      <h2 className="text-4xl font-semibold text-[#555555] text-center mb-6">
          See How You Stack Up Against Others!
        </h2>
        <div className="bg-white shadow-2xl rounded-lg overflow-hidden  border-[#c59438] border-2">
          <table className="min-w-full bg-white">
            <thead>
              <tr  className='shadow-2xl'>
                <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-xl text-center  font-bold text-[#c59438] uppercase tracking-wider">Ranking # </th>
                <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-xl text-center  font-bold text-[#c59438] uppercase tracking-wider">Name </th>
                <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-xl text-center  font-bold text-[#c59438] uppercase tracking-wider">Duration </th>
                <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-xl text-center  font-bold text-[#c59438] uppercase tracking-wider">Accuracy </th>
                <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-xl text-center  font-bold text-[#c59438] uppercase tracking-wider">Typing Speed </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-gray-50 hover:bg-gray-100   transition duration-150 hover:text-[#c59438]"> <td className="px-6 py-4 whitespace-no-wrap text-xl font-bold  text-center leading-5 text-gray-900 hover:text-[#c59438]">   1 </td>
                <td className="px-6 py-4 whitespace-no-wrap text-lg text-center leading-5 text-gray-900 hover:text-[#c59438]">Abdul </td>
                <td className="px-6 py-4 whitespace-no-wrap text-lg text-center leading-5 text-gray-900 hover:text-[#c59438]">00:45 </td>
                <td className="px-6 py-4 whitespace-no-wrap text-lg text-center leading-5 text-gray-900 hover:text-[#c59438]">100% </td>
                <td className="px-6 py-4 whitespace-no-wrap font-bold text-xl text-center leading-5 text-gray-900 hover:text-[#c59438]">50wpm </td>
              </tr>


 {/* <tr className="bg-white hover:bg-gray-100 transition duration-150">
                <td className="px-6 py-4 whitespace-no-wrap text-sm text-center leading-5 text-gray-900">
                  2
                </td>
                <td className="px-6 py-4 whitespace-no-wrap text-sm text-center leading-5 text-gray-900">
                  Abdul
                </td>
                <td className="px-6 py-4 whitespace-no-wrap text-sm text-center leading-5 text-gray-900">
                  00:50
                </td>
                <td className="px-6 py-4 whitespace-no-wrap text-sm text-center leading-5 text-gray-900">
                  98%
                </td>
                <td className="px-6 py-4 whitespace-no-wrap text-sm text-center leading-5 text-gray-900">
                  48wpm
                </td>
              </tr> */}
                         {/*   <tr className="bg-gray-50 hover:bg-gray-100 transition duration-150">
                <td className="px-6 py-4 whitespace-no-wrap text-sm text-center leading-5 text-gray-900">
                  3
                </td>
                <td className="px-6 py-4 whitespace-no-wrap text-sm text-center leading-5 text-gray-900">
                  Abdul
                </td>
                <td className="px-6 py-4 whitespace-no-wrap text-sm text-center leading-5 text-gray-900">
                  01:00
                </td>
                <td className="px-6 py-4 whitespace-no-wrap text-sm text-center leading-5 text-gray-900">
                  95%
                </td>
                <td className="px-6 py-4 whitespace-no-wrap text-sm text-center leading-5 text-gray-900">
                  45wpm
                </td> */}
              {/* </tr> */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Ranking;
