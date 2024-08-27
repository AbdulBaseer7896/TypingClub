import { useCallback, useEffect } from 'react';
import { useDifficultyLevelState, useSelectTimeState, useTakeInputState, useTargetParagraphState } from '../../hooks/BasicUseState';
import Paragraphs from '../../utils/generateParagraph';

const MainTyping = () => {
    const { input, setInput } = useTakeInputState();
    const { targetParagraph, setTargetParagraph } = useTargetParagraphState();
    const {Level } = useDifficultyLevelState()
    // const {including , toggleIncluding} = useIncludingState()
    const { selectTime } = useSelectTimeState()



    const applyFilters = (difficulty = "hard", time = "30s") => {
        console.log("Applying filters with difficulty:", difficulty, "and time:", time);
        const data = Paragraphs.find(p =>
            p.difficulty === difficulty &&
            p.number === true &&
            p.symbols === true &&
            p.time === time
        );
        if (data) {
            setTargetParagraph(data.text);
        } else {
            console.log("No matching paragraph found");
        }
    };
    
    useEffect(() => {
        console.log("useEffect triggered with Level:", Level, "and selectTime:", selectTime);
        applyFilters(Level);
    }, [Level]);
    


    // useEffect(() => {
    //     applyFilters(Level, selectTime);
    // }, [Level, selectTime , applyFilters])


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
                            onChange={(e) => setInput(e.target.value)}
                            className='w-[90%] h-[100px] text-4xl p-4 font-[Open_Sans] tracking-wide'
                            placeholder='Start typing there ...'
                            name="inputText"
                            type="text"
                        />
                    </div>
                    {input}
                </div>
                <div className="right">
                    ok I am also there
                </div>
            </div>
        </div>
    );
};

export default MainTyping;
