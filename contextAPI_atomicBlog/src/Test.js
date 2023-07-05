import {useState} from "react";

function SlowComponent() {
    // If this is too slow on your maching, reduce the `length`
    const words = Array.from({length: 100_000}, () => "WORD");
    return (
        <ul>
            {words.map((word, i) => (
                <li key={i}>
                    {i}: {word}
                </li>
            ))}
        </ul>
    );
}

function Counter({children}) {
    const [count, setCount] = useState(0);
    return (
        <div>
            <h1>Slow counter?!?</h1>
            <button onClick={() => setCount((c) => c + 1)}>Increase: {count}</button>
            {children} {/*Counter컴포넌트 외부에서 생성되어 전달되므로 Counter의 재렌더링에 영향 받지 않는다.*/}
        </div>
    );
}

export default function Test() {
    return (
        <Counter>
            <SlowComponent/>
        </Counter>
    );
}
