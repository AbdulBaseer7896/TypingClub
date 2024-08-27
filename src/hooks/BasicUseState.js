import { useState } from "react";


const  useTakeInputState = () => {
    const [input , setInput] = useState("");
    return { input, setInput };
};

const useTargetParagraphState = ()=>{

    const [targetParagraph , setTargetParagraph] = useState("")
    return {targetParagraph , setTargetParagraph}
}


const useDifficultyLevelState = ()=>{
    const [Level ,setLevel ] = useState("medium")
    return {Level , setLevel}
}


const useIncludingState = () => {
    const [including, setIncluding] = useState([]);

    const toggleIncluding = (item) => {
        setIncluding((prevIncluding) => {
            if (prevIncluding.includes(item)) {
                // Remove item from the array if it's already included
                return prevIncluding.filter((i) => i !== item);
            } else {
                // Add item to the array if it's not included
                return [...prevIncluding, item];
            }
        });
    };

    return { including, toggleIncluding };
};


const useSelectTimeState = () => {
    const [selectTime, setSelectTime] = useState('30s');
    return { selectTime, setSelectTime };
};


export  {useTakeInputState  , useTargetParagraphState , useDifficultyLevelState , useIncludingState , useSelectTimeState};

