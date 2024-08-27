// import { createSlice } from "@reduxjs/toolkit";
// import { useState } from "react";

// const initialState = {
//     level: 'medium',
//     selectTime: '30s',
//     including: [],
//     targetParagraph: "",
//     input: "",
//     typingSpeed : 0,
//     Accuracy : 100,
// };

// let count = 0; // Use let to allow reassignment



// const FilterReducer = createSlice({
//     name: "Filters",
//     initialState,
//     reducers: {
//         setLevel: (state, action) => {
//             state.level = action.payload;
//         },

//         setTimeSelector: (state, action) => {
//             state.selectTime = action.payload;
//         },

//         setIncluding: (state, action) => {
//             const item = action.payload;
//             if (state.including.includes(item)) {
//                 state.including = state.including.filter((i) => i !== item);
//             } else {
//                 state.including.push(item);
//             }
//         },

//         setTargetParagraph: (state, action) => {
//             state.targetParagraph = action.payload;
//         },

//         setInput: (state, action) => {
//             const newInput = action.payload;
//             const previousInput = state.input;

//             // Update state with new input
//             state.input = newInput;

//             // Check if input length changed
//             if (newInput.length > previousInput.length) {
//                 // A new character has been added
//                 const newChar = newInput[newInput.length - 1];
//                 const prevChar = previousInput[previousInput.length - 1];

//                 if (newChar === ' ' && prevChar !== ' ') {
//                     count += 1; // Increment count if a space is added
//                 }
//             } else if (newInput.length < previousInput.length) {
//                 // A character has been removed
//                 const removedChar = previousInput[previousInput.length - 1];                
//                 const newChar = newInput[newInput.length - 1];

//                 if (removedChar === ' ' && newChar !== ' ') {
//                     const words = state.input.split(' ').map(word => word.trim().toLowerCase());
//                     count = words.length-1 // Decrement count if a space is removed
//                 }
//             }

//             const words = state.targetParagraph.split(' ').map(word => word.trim().toLowerCase());
//             const inputWords = state.input.split(' ').map(word => word.trim().toLowerCase());

//             console.log("Current count: ", count);

//             if (inputWords.length > 0 && newInput[newInput.length - 1] ===" ") { 
//                 if(words[count-1] === inputWords[count-1]){
//                 console.log("This word is matched");
//                 }
//                 else{
//                     console.log("this no wrong")
//                 }
//             }
//         },
//     },
// });

// export const { setLevel, setTimeSelector, setIncluding, setTargetParagraph, setInput } = FilterReducer.actions;

// export default FilterReducer.reducer;



import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    level: 'medium',
    selectTime: '30s',
    including: [],
    targetParagraph: "",
    input: "",
    typingSpeed: 0,
    accuracy: 100,
    startTime: null,  // Start time for typing
    elapsedTime: 0,   // Elapsed time
};

let count = 0; // Use let to allow reassignment
let correctWordCount = 0; // To count correct words

const FilterReducer = createSlice({
    name: "Filters",
    initialState,
    reducers: {
        setLevel: (state, action) => {
            state.level = action.payload;
        },

        setTimeSelector: (state, action) => {
            state.selectTime = action.payload;
        },

        setIncluding: (state, action) => {
            const item = action.payload;
            if (state.including.includes(item)) {
                state.including = state.including.filter((i) => i !== item);
            } else {
                state.including.push(item);
            }
        },

        setTargetParagraph: (state, action) => {
            state.targetParagraph = action.payload;
        },

        startTyping: (state) => {
            state.startTime = new Date().getTime();
        },

        setInput: (state, action) => {
            const newInput = action.payload;
            const previousInput = state.input;
            state.startTime = true

            // Update state with new input
            state.input = newInput;

            // Calculate elapsed time in minutes
            if (state.startTime) {
                const now = new Date().getTime();
                state.elapsedTime = (now - state.startTime) / 60000; // Convert milliseconds to minutes
            }

            // Check if input length changed
            if (newInput.length > previousInput.length) {
                // A new character has been added
                const newChar = newInput[newInput.length - 1];
                const prevChar = previousInput[previousInput.length - 1];

                if (newChar === ' ' && prevChar !== ' ') {
                    count += 1; // Increment count if a space is added
                }
            } else if (newInput.length < previousInput.length) {
                // A character has been removed
                const removedChar = previousInput[previousInput.length - 1];
                const newChar = newInput[newInput.length - 1];

                if (removedChar === ' ' && newChar !== ' ') {
                    const words = state.input.split(' ').map(word => word.trim().toLowerCase());
                    count = words.length - 1; // Adjust count based on spaces
                }
            }

            const words = state.targetParagraph.split(' ').map(word => word.trim().toLowerCase());
            const inputWords = state.input.split(' ').map(word => word.trim().toLowerCase());

            console.log("Current count: ", count);

            if (inputWords.length > 0 && newInput[newInput.length - 1] === " ") {
                if (words[count - 1] === inputWords[count - 1]) {
                    console.log("This word is matched");
                    correctWordCount += 1;
                } else {
                    console.log("This word is incorrect");
                }
            }

            // Calculate typing speed (WPM)
            console.log("This time - " , state.elapsedTime)
            if (state.elapsedTime > 0) {
                state.typingSpeed = (correctWordCount / state.elapsedTime);
            }

            // Calculate accuracy
            if (count > 0) {
                state.accuracy = (correctWordCount / count) * 100;
            }
        },

        resetTyping: (state) => {
            state.input = "";
            state.typingSpeed = 0;
            state.accuracy = 100;
            state.startTime = null;
            state.elapsedTime = 0;
            count = 0;
            correctWordCount = 0;
        }
    },
});

export const { setLevel, setTimeSelector, setIncluding, setTargetParagraph, setInput, startTyping, resetTyping } = FilterReducer.actions;

export default FilterReducer.reducer;
