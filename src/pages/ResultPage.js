import React from 'react';
import Navbar from '../components/NavBar';
import { useDispatch, useSelector } from 'react-redux';
import { resetTyping } from '../redux/slices/Filter';
import { useNavigate } from 'react-router-dom';


const ResultPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const accuracy = useSelector((state) => state.filter.accuracy);
    const elapsedTime = useSelector((state) => state.filter.elapsedTime);
    const typingSpeed = useSelector((state) => state.filter.typingSpeed);
    let stars = 0

    if(accuracy === 100){
        stars = 5
    }else if(accuracy <100 && accuracy > 95){
        stars = 4
    }else if(accuracy <95 && accuracy >90){
        stars = 3
    }else if(accuracy <90 && accuracy >80){
        stars = 2
    }else if(accuracy <80 && accuracy >70)
    {
        stars = 1
    }
    else{
        stars = 0
    }
    const handleTryAgain= ()=>{
        dispatch(resetTyping())
        navigate('/');

    }

    const handleUpdateRanking = ()=>{
       // Update Ranking logic here
    }
  return (
    <div>
    <Navbar />

    

    <div className="bg-[#3d5e87] text-white h-[640px] flex items-center justify-center">
      {/* Main Container */}
      <div className="bg-bla p-8 rounded-lg -mt-5 shadow-l w-full max-w-4xl mx-auto relative">
        {/* Stars */}
        <div className="flex justify-center mb-16 text-3xl">
          {[...Array(stars)].map((_, i) => (
            <span key={i} className="text-yellow-400 text-8xl">&#9733;</span>
          ))}
          {[...Array(5-stars)].map((_, i) => (
            <span key={i} className="text-gray-500 text-8xl">&#9733;</span>
          ))}
        </div>

        {/* Stats Container */}
        <div className="flex justify-around items-center relative">
          {/* Accuracy Circle */}
          <div className="text-center relative ">
            <div className="bg-white bg-opacity-10 w-52 h-52 flex-row pt-16 items-center justify-center border-[#FFC22A]  border-[5px] rounded-full">
              <div className="text-5xl font-bold">{Math.round(accuracy)}%</div>
            <div className="text-mg text-[#88cce8] pt-2 font-bold mt-1">Wrong Words 97</div>
            </div>
            <div className="text-xl mt-1">Accuracy</div>
          </div>

          {/* Duration Circle */}
          <div className="text-center relative">
            <div className="bg-white bg-opacity-10 w-44 h-44 flex-row pt-14 items-center justify-center border-[#FFC22A]  border-[5px] rounded-full">
              <div className="text-4xl font-bold">{Math.floor(elapsedTime*100 /60) }{Math.floor(elapsedTime*100 /60) < 10 ? '0' : ''}  : {Math.floor(elapsedTime*100 %60) < 10 ? '0' : ''} {Math.floor(elapsedTime*100 % 60)} </div>
               <div className="text-sm  text-[#88cce8] mt-1 font-bold pl-2">min : seconds</div>
            </div>
            <div className="text-lg mt-1">Duration</div>
          </div>

          {/* Speed Circle */}
          <div className="text-center relative">
            <div className="bg-white bg-opacity-10 w-52 h-52 flex-row pt-14 items-center justify-center border-[#FFC22A]  border-[5px] rounded-full">
              <div className="text-7xl font-bold">{Math.round(typingSpeed)} </div>
              <div className="text-xl text-[#88cce8] mt-1 font-bold">wpm</div>
            </div>
            <div className="text-xl mt-1">Speed</div>
          </div>
        </div>
      </div>
    </div>

    <div>
    <div className="flex justify-between mt-8 items-center px-96">
          <button onClick={handleTryAgain} className="bg-[#59d797]  text-white text-2xl border border-white  px-7 pb-3  pt-2 rounded-3xl hover:bg-[#0eb168]">Try again</button>
          <p className="text-lg font-bold text-[#555555] text-center  max-w-sm">
            {stars >3 ? "Great work on accuracy. Now it's time to build up your speed and earn more stars." : "Please focus on your accuracy First, try again." }
            
          </p>
          <button onClick={handleUpdateRanking} className="bg-[#ffffff]  text-2xl border border-[#555555]  text-[#555555] px-8 pb-3  pt-2 rounded-3xl hover:bg-[#555555] hover:text-white">Update on Ranking</button>
        </div>
    </div>
    </div>
  );
};

export default ResultPage;
