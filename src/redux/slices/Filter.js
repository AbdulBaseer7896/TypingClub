import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isFrozen : false, 
    level: 'medium',
    selectTime: '30s',
    including: [],
    targetParagraph: "",
    input: "",
    typingSpeed: 0,
    accuracy: 100,
    startTime: null,
    elapsedTime: 0,
    isTypingFinished: false,
};

let count = 0;
let correctWordCount = 0;

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
            if(item){
                if (state.including.includes(item)) {
                    state.including = state.including.filter((i) => i !== item);
                } else {
                    state.including.push(item);
                }
            }
        },

        setTargetParagraph: (state, action) => {
            state.targetParagraph = action.payload;
            state.isTypingFinished = false;
        },

        startTyping: (state) => {
            if (state.startTime) {
                const now = new Date().getTime();
                state.elapsedTime += (now - state.startTime) / 60000; // Convert milliseconds to minutes
            } else {
                state.startTime = new Date().getTime();
            }
        },

        setIsFrozen: (state, action) => {
            state.isFrozen = action.payload;
        },

        setInput: (state, action) => {
            if (state.isTypingFinished) {
                alert("The typing is completed");
                return;
            }

            const newInput = action.payload;
            const previousInput = state.input;

            // Prevent consecutive spaces
            if (newInput.length > previousInput.length) {
                const newChar = newInput[newInput.length - 1];
                const prevChar = previousInput[previousInput.length - 1];

                if (newChar === ' ' && prevChar === ' ') {
                    return; // Block the input if two spaces are entered consecutively
                }

                if (newChar === ' ' && prevChar !== ' ') {
                    count += 1; // Increment count if a space is added
                }
            }

            if (state.startTime) {
                const now = new Date().getTime();
                state.elapsedTime = (now - state.startTime) / 60000; // Convert milliseconds to minutes
            }

            const words = state.targetParagraph.split(' ').map(word => word.trim().toLowerCase());
            const inputWords = newInput.split(' ').map(word => word.trim().toLowerCase());

            if (newInput.length < previousInput.length) {
                const lastSpaceIndex = previousInput.lastIndexOf(' ');
                const isBackspaceAllowed = newInput.length > lastSpaceIndex;

                if (!isBackspaceAllowed) {
                    return;
                }
            }

            state.input = newInput;

            if (inputWords.length > 0 && newInput[newInput.length - 1] === " ") {
                if (words[count - 1] === inputWords[count - 1]) {
                    correctWordCount += 1;
                }
            }

            if (state.elapsedTime > 0) {
                state.typingSpeed = (correctWordCount / state.elapsedTime);
            }

            if (count > 0) {
                state.accuracy = (correctWordCount / count) * 100;
            }

            if (inputWords.length >= words.length && newInput.trim() === state.targetParagraph.trim()) {
                state.isTypingFinished = true;
                state.input = newInput.trim();
            }

            if (count === words.length) {
                state.isTypingFinished = true;
            }
        },

        resetTyping: (state) => {
            state.input = "";
            state.typingSpeed = 0;
            state.accuracy = 100;
            state.startTime = null;
            state.elapsedTime = 0;
            state.isTypingFinished = false;
            state.isFrozen = false;
            count = 0;
            correctWordCount = 0;
        }
    },
});

export const { setLevel, setTimeSelector, setIncluding, setTargetParagraph, setInput, startTyping, resetTyping, setIsFrozen } = FilterReducer.actions;

export default FilterReducer.reducer;
