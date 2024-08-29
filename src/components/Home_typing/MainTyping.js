import { useEffect, useState } from 'react';
import Paragraphs from '../../utils/generateParagraph';
import { useDispatch, useSelector } from 'react-redux';
import { setTargetParagraph, startTyping, resetTyping, setInput , setIsFrozen} from '../../redux/slices/Filter';
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
    }, [isTypingFinished === true])

    useEffect(() => {
        applyFilters(Level, selectTime, including);
    }, [Level, selectTime, including]);

    return (
        <div>
            <div className="main container mx-auto h-[85vh] bg-gray-400 text-[#3a575f] flex grid-cols-2">
                <div className="left w-[80%] p-8 ">
                    <div className="givenText w-[90%] h-[50%] border border-black rounded-3xl p-6 ">
                        <p className='text-4xl font-[Open_Sans] tracking-wide '>{targetParagraph}</p>
                    </div>
                    <button onClick={handleStartStop} className='border hidden border-black rounded-lg w-[8%] py-2 text-center text-lg font-bold mt-10 mx-5 bg-white text-black'>
                        {isRunning ? "Stop" : "Play"}
                    </button>

                    <div className="textBox py-10 px-2 w-2/3 fixed">
                        <input
                            value={input}
                            onChange={handleChange}
                            autoComplete="off"
                            className='w-[90%] h-[100px] text-4xl p-4 pr-12 font-[Open_Sans] tracking-wide'
                            placeholder='Start typing here ...'
                            name="inputText"
                            type="text"
                            // disabled={isTypingFinished}
                        />
                    </div>
                </div>
                <div className="right mt-[25%] text-2xl">
                    <div>Speed: {Math.round(typingSpeed)} wpm</div><br />
                    <div>Accuracy: {Math.round(accuracy)}%</div>
                </div>
            </div>
        </div>
    );
};

export default MainTyping;
