import {  useEffect } from 'react';
import {  useTakeInputState, useTargetParagraphState } from '../../hooks/BasicUseState';
import Paragraphs from '../../utils/generateParagraph';
import { useDispatch, useSelector } from 'react-redux';
import { setTargetParagraph } from '../../redux/slices/Filter';
import { setInput } from '../../redux/slices/Filter';  // Import the action


const MainTyping = () => {
    const dispatch = useDispatch();
    const Level = useSelector((state) => state.filter.level); 
    const selectTime = useSelector((state) => state.filter.selectTime); 
    const including = useSelector((state) => state.filter.including); // Add including
    const targetParagraph = useSelector((state) => state.filter.targetParagraph); // Add including
    const input = useSelector((state) => state.filter.input);  // Access input from Redux state
    const accuracy = useSelector((state) => state.filter.accuracy);  // Access input from Redux state
    const typingSpeed = useSelector((state) => state.filter.typingSpeed);  // Access input from Redux state
    


    const applyFilters = (difficulty = "hard", time = "30s", including = []) => {        
        const data = Paragraphs.find(p =>
            p.difficulty === difficulty &&
            p.time === time &&
            (including.includes("number") ? p.number === true : true) &&
            (including.includes("symbols") ? p.symbols === true : true) &&
            (including.includes("text") ? p.text === true : true)  // Assuming 'text' is a filter condition
        );
        
        if (data) {
            dispatch(setTargetParagraph(data.text));
        } else {
            console.log("No matching paragraph found");
        }
    };

    const handleChange = (e) => {
        dispatch(setInput(e.target.value));  // Dispatch action to update input in Redux state
    };



    useEffect(()=>{
        applyFilters(Level , selectTime, including)
    },[Level , selectTime , including])


    return (
        <div>
            <div className="main container mx-auto my-5 h-[80vh] bg-gray-400 text-[#3a575f] flex grid-cols-2">
                <div className="left w-[80%] p-8">
                    <div className="givenText w-[90%] h-[50%] border border-black rounded-3xl p-6">
                        <p className='text-4xl font-[Open_Sans] tracking-wide'>{targetParagraph}</p>
                    </div>
                    <div className="textBox py-10 px-2">
                        <input
                            value={input}
                            onChange={handleChange}
                            className='w-[90%] h-[100px] text-4xl p-4 font-[Open_Sans] tracking-wide'
                            placeholder='Start typing there ...'
                            name="inputText"
                            type="text"
                        />
                    </div>
                    {input}
                </div>
                <div className="right mt-[25%] text-2xl">
                        <div>
                            Speed : {typingSpeed}wpm
                        </div><br />
                        <div>
                            Accuracy : {accuracy}%
                        </div>
                </div>
            </div>
        </div>
    );
};

export default MainTyping;
