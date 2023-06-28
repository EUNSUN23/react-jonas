import {useReducer} from "react";

const initialState = {count: 0, step: 1}

function reducer(state, action) { // state - 현재 state
    console.log(state, action);

    switch (action.type) {
        case 'inc':
            return {...state, count: state.count + state.step};
        case 'dec':
            return {...state, count: state.count - state.step};
        case 'setCount':
            return {...state, count: action.payload};
        case 'setStep':
            return {...state, step: action.payload};
        case 'reset':
            return initialState;
        default :
            throw Error("Unknown action");
    }

}

function DateCounter() {
    // const [count, setCount] = useState(0);
    // const [step, setStep] = useState(1);

    const [state, dispatch] = useReducer(reducer, initialState);
    const {count, step} = state;

    // This mutates the date object.
    const date = new Date("june 21 2027");
    date.setDate(date.getDate() + count);

    const dec = function () {
        dispatch({type: 'dec'}); // reducer함수에 넘겨주는 action 파라미터
        // setCount((count) => count - step);
    };

    const inc = function () {
        dispatch({type: 'inc'});
        // setCount((count) => count + step);
    };

    const defineCount = function (e) {
        dispatch({type: 'setCount', payload: Number(e.target.value)});
        // setCount(Number(e.target.value));
    };

    const defineStep = function (e) {
        dispatch({type: "defineStep", payload: Number(e.target.value)});
    };

    const reset = function () {
        dispatch({type: "reset"});
    };

    return (
        <div className="counter">
            <div>
                <input
                    type="range"
                    min="0"
                    max="10"
                    value={step}
                    onChange={defineStep}
                />
                <span>{step}</span>
            </div>

            <div>
                <button onClick={dec}>-</button>
                <input value={count} onChange={defineCount}/>
                <button onClick={inc}>+</button>
            </div>

            <p>{date.toDateString()}</p>

            <div>
                <button onClick={reset}>Reset</button>
            </div>
        </div>
    );
}

export default DateCounter;