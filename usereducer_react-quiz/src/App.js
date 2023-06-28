import Header from "./Header";
import Main from "./Main";
import {useEffect, useReducer} from "react";

const initialState = {
    questions: [],
    // 'loading', 'error', 'ready', 'active', 'finish'
    status: "loading"
}

function reducer(state, action) {
    switch (action.type) {
        case 'dataReceived':
            return {...state, questions: action.payload, status: 'ready'}; // dispatch한번으로 status, questions 변경
        case 'dataFailed':
            return {...state, status:'error'};
        default:
            throw new Error("Action is unknown");
    }
}

export default function App() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const {questions, status} = state;

    useEffect(function () {
        fetch('http://localhost:9000/questions')
            .then(res => res.json)
            .then(data => dispatch({type: 'dataReceived', payload: data}))
            .catch(err => dispatch({type:'dataFailed'}));
    }, []);

    return (
        <div className="app">
            <Header/>
            <Main>
                <p>1/15</p>
                <p>Question?</p>
            </Main>
        </div>
    )
};
