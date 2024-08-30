import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setLevel, setTimeSelector, setIncluding, resetTyping } from '../../redux/slices/Filter';

const Filters = () => {
    const dispatch = useDispatch()
    const Level = useSelector((state) => state.filter.level);
    const selectTime = useSelector((state) => state.filter.selectTime)
    const including = useSelector((state) => state.filter.including)
    const isFrozen = useSelector((state) => state.filter.isFrozen)

    const handleLevelChange = (newLevel) => {
        if (!isFrozen) {
            dispatch(setLevel(newLevel));
        }
    };

    const handleTimeChange = (newTime) => {
        if (!isFrozen) {
            dispatch(setTimeSelector(newTime));
        }
    }

    const handleIncludingToggle = (item) => {
        if (!isFrozen) {
            dispatch(setIncluding(item));
        }
    };
    
    const handleRestart = () => {
        dispatch(resetTyping());
    }
    
    return (
        <div className='bg-[#0d1110] shadow-md'>
            <div className='mx-auto px-3 md:px-6 lg:px-12 py-2 flex flex-wrap justify-between bg-gray-800 items-center'>
                {/* Difficulty Level */}
                <div className='flex flex-wrap items-center text-sm font-bold text-[#d6b984]'>
                    <p className='px-2 md:px-5 text-[#c59438]'>Difficulty Level:</p>
                    <button onClick={() => handleLevelChange("easy")} className={`px-2 md:px-5 ${Level === "easy" ? "text-[#c59438]" : ""}`}>Easy</button>
                    <button onClick={() => handleLevelChange("medium")} className={`px-2 md:px-5 ${Level === "medium" ? "text-[#c59438]" : ""}`}>Medium</button>
                    <button onClick={() => handleLevelChange("hard")} className={`px-2 md:px-5 ${Level === "hard" ? "text-[#c59438]" : ""}`}>Hard</button>
                </div>

                {/* Including */}
                <div className='flex flex-wrap items-center text-sm font-bold text-[#d6b984]'>
                    <p className='px-2 md:px-5 text-[#c59438]'>Including:</p>
                    <button className="px-2 md:px-5 text-[#c59438]">Text</button>
                    <button onClick={() => handleIncludingToggle("number")} className={`px-2 md:px-5 ${including.includes("number") ? "text-[#c59438]" : ""}`}>Number</button>
                    <button onClick={() => handleIncludingToggle("symbols")} className={`px-2 md:px-5 ${including.includes("symbols") ? "text-[#c59438]" : ""}`}>Symbols</button>
                </div>

                {/* Length */}
                <div className='flex flex-wrap items-center text-sm font-bold text-[#d6b984]'>
                    <p className='px-2 md:px-5 text-[#c59438]'>Length:</p>
                    <button onClick={() => handleTimeChange("30s")} className={`px-2 md:px-5 ${selectTime === "30s" ? "text-[#c59438]" : ""}`}>Sm</button>
                    <button onClick={() => handleTimeChange("60s")} className={`px-2 md:px-5 ${selectTime === "60s" ? "text-[#c59438]" : ""}`}>Lg</button>
                    <button onClick={() => handleTimeChange("120s")} className={`px-2 md:px-5 ${selectTime === "120s" ? "text-[#c59438]" : ""}`}>X-lg</button>
                </div>

                {/* Reset Button */}
                <div className='flex items-center text-sm font-bold text-[#d6b984]'>
                    <button onClick={handleRestart} className='px-2 md:px-5 text-[#c59438] hover:underline'>Reset</button>
                </div>
            </div>
            <hr className="bg-[#0d1110] border-0 h-1"/>
        </div>
    )
}

export default Filters;
