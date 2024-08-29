import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setLevel , setTimeSelector , setIncluding, resetTyping } from '../../redux/slices/Filter';



const Filters = () => {
    // const { selectTime, setSelectTime } = useSelectTimeState()
    const dispatch = useDispatch()
    const Level = useSelector((state) => state.filter.level); // Use 'filter' instead of 'filters'
    const selectTime = useSelector((state)=> state.filter.selectTime)
    const including = useSelector((state)=> state.filter.including)
    const isFrozen = useSelector((state)=> state.filter.isFrozen)

    const handleLevelChange = (newLevel) => {
        if(!isFrozen){
        dispatch(setLevel(newLevel));  // Dispatch the action to update the level in the Redux store
        }
    };

    const handleTimeChange = (newTime) =>{
        if(!isFrozen){
            console.log("this si the =  , " , isFrozen)
        dispatch(setTimeSelector(newTime));  // Dispatch the action to update the time selector in the Redux store
        }
    }

    const handleIncludingToggle = (item) => {
        if(!isFrozen){
        dispatch(setIncluding(item));
        }
    };
    
    const handleRestart= ()=>{
        dispatch(resetTyping());
    }
    

  return (
    
    <filter className='bg-[#0d1110] shadow-md '>
    <div className='mx-auto px-3 md:px-6 lg:px-12 py-1.5 flex justify-between bg-gray-800 items-center'>
        <div className='flex  w-full max-w-lg text-sm font-bold text-[#d6b984]'>
            <p className='px-5 text-[#c59438]'>Difficulty Level : </p>
            <button onClick={() => handleLevelChange("easy")}  className={`px-5 ${Level === "easy" ? "text-[#c59438]" : ""}`}>Easy</button>            
            <button onClick={() => handleLevelChange("medium")}  className={`px-5 ${Level === "medium" ? "text-[#c59438]" : ""}`}>Medium</button>           
            <button onClick={() => handleLevelChange("hard")}  className={`px-5 ${Level === "hard" ? "text-[#c59438]" : ""}`}>Hard</button>          
        </div>
        <div className='flex w-full max-w-lg text-sm font-bold text-[#d6b984]'>
            <p href="/" className='hover:underline px-5 text-[#c59438]'>Including : </p> 
            <button  className="px-5 text-[#c59438] ">Text</button> 
            <button  onClick={() => handleIncludingToggle("number")}   className={`px-5 ${including.includes("number") ? "text-[#c59438]" : ""}`} > Number </button>           
            <button  onClick={() => handleIncludingToggle("symbols")}   className={`px-5 ${including.includes("symbols") ? "text-[#c59438]" : ""}`} > Symbols </button>  
        </div>
        <div className='flex w-full max-w-lg text-sm font-bold text-[#d6b984]'>
            <p href="/" className='hover:underline px-3 text-[#c59438]'>Time : </p>
            <button  onClick={() => handleTimeChange("30s")}   className={`px-5 ${selectTime === "30s" ? "text-[#c59438]" : ""}`} > 30s </button>           
            <button  onClick={() => handleTimeChange("60s")}   className={`px-5 ${selectTime === "60s" ? "text-[#c59438]" : ""}`} > 60s </button>  
            <button  onClick={() => handleTimeChange("120s")}   className={`px-5 ${selectTime === "120s" ? "text-[#c59438]" : ""}`} > 120s </button>  
        </div>
        <div className='flex  max-w-lg text-sm font-bold text-[#d6b984]'>
            <button onClick={handleRestart} className='hover:underline px-3 text-[#c59438]'>Resets</button>
        </div>

    </div>
        <hr className="bg-[#0d1110] border-0 h-1"/>
    </filter>
)
}

export default Filters;
