import { useEffect, useState } from 'react';
import Paragraphs from '../../utils/generateParagraph';
import { useDispatch, useSelector } from 'react-redux';
import { setTargetParagraph, startTyping, resetTyping, setInput, setIsFrozen } from '../../redux/slices/Filter';
import { useNavigate } from 'react-router-dom';

const MainTyping = () => {
    const dispatch = useDispatch();
    const [isRunning, setIsRunning] = useState(false);
    const navigate = useNavigate();
    const Level = useSelector((state) => state.filter.level); 
    const selectTime = useSelector((state) => state.filter.selectTime); 
    const including = useSelector((state) => state.filter.including);
    const targetParagraph = useSelector((state) => state.filter.targetParagraph);
    const input = useSelector((state) => state.filter.input);  
    const accuracy = useSelector((state) => state.filter.accuracy);
    const typingSpeed = useSelector((state) => state.filter.typingSpeed);
    const isTypingFinished = useSelector((state) => state.filter.isTypingFinished);
    const count = useSelector((state) => state.filter.count); // Add this selector to access count


    const applyFilters = (difficulty = "hard", time = "30s", including = []) => {        
        const data = Paragraphs.find(p =>
            p.difficulty === difficulty &&
            p.time === time &&
            (including.includes("number") ? p.number === true : true) &&
            (including.includes("symbols") ? p.symbols === true : true) &&
            (including.includes("text") ? p.text === true : true)
        );
        
        if (data) {
            dispatch(setTargetParagraph(data.text));
        } else {
            console.log("No matching paragraph found");
        }
    };

    const handleChange = (e) => {
        if (!isRunning && !isTypingFinished) {
            dispatch(setIsFrozen(true));
            dispatch(startTyping());
            setIsRunning(true);
        }
        dispatch(setIsFrozen(true));
        dispatch(setInput(e.target.value));
    };

    const handleStartStop = () => {
        setIsRunning(!isRunning);
        if (isRunning) {
            dispatch(setIsFrozen(true));
            dispatch(resetTyping());  // Stop and reset everything
        } else {
            dispatch(startTyping());  // Resume from where it left off
        }
    };

    useEffect(()=>{
        if(isTypingFinished){
            navigate('/ResultPage');
        }
    }, [isTypingFinished, navigate]);

    useEffect(() => {
        applyFilters(Level, selectTime, including);
    }, [Level, selectTime, including]);

    // Prevent copy, paste, cut
    const handleCopyCutPaste = (e) => {
        e.preventDefault();
    };

    const getHighlightedParagraph = (text, count) => {
        // Split the text into words
        const words = text.split(' ');
    
        // Create a new array where each word is wrapped in a <span> with a highlight class if needed
        return words.map((word, index) => {
            const isHighlighted = index === count;
            return (
                <span key={index} className={isHighlighted ? "bg-yellow-300" : ""}>
                    {word}
                </span>
            );
        }).reduce((prev, curr, index) => {
            // Add a space between words except for the last word
            return prev.concat(index < words.length - 1 ? [curr, ' '] : [curr]);
        }, []);
    };
    

    

    return (
        <div className=" mx-auto p-8 bg-gradient-to-r from-blue-400 to-purple-500 min-h-screen flex items-center justify-center">
            <div className="flex flex-col lg:flex-row w-full max-w-5xl -mt-44 bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="w-full lg:w-2/3 p-6 flex flex-col">
                    <div className="flex-grow mb-6 bg-gray-100 border border-gray-300 rounded-lg p-6">
                        <p className='text-2xl lg:text-3xl font-semibold text-gray-800'>
                            {getHighlightedParagraph(targetParagraph, count)}
                        </p>
                    </div>
                    <button onClick={handleStartStop} className='hidden self-center py-2 px-6 rounded-lg text-lg font-semibold bg-blue-600 text-white shadow-md hover:bg-blue-700 transition'>
                        {isRunning ? "Stop" : "Play"}
                    </button>
                    <div className="flex-grow mt-6">
                        <input
                            value={input}
                            onChange={handleChange}
                            autoComplete="off"
                            className='w-full h-24 text-2xl p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition'
                            placeholder='Start typing here ...'
                            name="inputText"
                            type="text"
                            onCopy={handleCopyCutPaste}
                            onPaste={handleCopyCutPaste}
                            onCut={handleCopyCutPaste}
                        />
                    </div>
                </div>
                <div className="w-full lg:w-1/3 p-6 bg-gray-200 border-t lg:border-t-0 lg:border-l border-gray-300 flex flex-col items-center justify-center">
                    <div className="text-2xl font-medium text-gray-700 mb-4">
                        <div>Speed: <span className="font-bold text-blue-600">{Math.round(typingSpeed)} wpm</span></div>
                        <div>Accuracy: <span className="font-bold text-green-600">{Math.round(accuracy)}%</span></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainTyping;
