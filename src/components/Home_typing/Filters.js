import React from 'react'
import { useDifficultyLevelState, useIncludingState, useSelectTimeState } from '../../hooks/BasicUseState'

const Filters = () => {

    const {Level , setLevel} = useDifficultyLevelState()
    const {including , toggleIncluding} = useIncludingState()
    const { selectTime, setSelectTime } = useSelectTimeState()


  return (
    <filter className='bg-[#0d1110] shadow-md '>
    <div className='mx-auto px-3 md:px-6 lg:px-12 py-1.5 flex justify-between bg-gray-800 items-center'>
        <div className='flex  w-full max-w-lg text-sm font-bold text-[#d6b984]'>
            <p className='px-5 text-[#c59438]'>Difficulty Level : </p>
            <button onClick={() => setLevel("easy")}  className={`px-5 ${Level === "easy" ? "text-[#c59438]" : ""}`}>Easy</button>            
            <button onClick={() => setLevel("medium")}  className={`px-5 ${Level === "medium" ? "text-[#c59438]" : ""}`}>Medium</button>           
            <button onClick={() => setLevel("hard")}  className={`px-5 ${Level === "hard" ? "text-[#c59438]" : ""}`}>Hard</button>          
        </div>
        <div className='flex justify- w-full max-w-lg text-sm font-bold text-[#d6b984]'>
            <p href="/" className='hover:underline px-5 text-[#c59438]'>Including : </p> 
            <button  className="px-5 text-[#c59438] ">Text</button> 
            <button  onClick={() => toggleIncluding("number")}   className={`px-5 ${including.includes("number") ? "text-[#c59438]" : ""}`} > Number </button>           
            <button  onClick={() => toggleIncluding("symbols")}   className={`px-5 ${including.includes("symbols") ? "text-[#c59438]" : ""}`} > Symbols </button>  
        </div>
        <div className='flex justify- w-full max-w-lg text-sm font-bold text-[#d6b984]'>
            <p href="/" className='hover:underline px-3 text-[#c59438]'>Time : </p>
            <button  onClick={() => setSelectTime("30s")}   className={`px-5 ${selectTime.includes("30s") ? "text-[#c59438]" : ""}`} > 30s </button>           
            <button  onClick={() => setSelectTime("60s")}   className={`px-5 ${selectTime.includes("60s") ? "text-[#c59438]" : ""}`} > 60s </button>  
            <button  onClick={() => setSelectTime("120s")}   className={`px-5 ${selectTime.includes("120s") ? "text-[#c59438]" : ""}`} > 120s </button>  
        </div>

    </div>

        

        <hr className="bg-[#0d1110] border-0 h-1"/>
        
        <h1>{Level}</h1>
        <h1>this is = {including}</h1>
        <h1>{selectTime}</h1>
    </filter>
  )
}

export default Filters
