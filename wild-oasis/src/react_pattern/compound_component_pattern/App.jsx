import Counter from "./Counter";
import "./styles.css";

// * compound component pattern - 컴포넌트의 props를 컴포넌트와 같은 context를 구독하는, '속성' 컴포넌트로 분리하는 패턴
export default function App() {
    return (
        <div>
            <h1>Compound Component Pattern</h1>
            {/*<Counter*/}
            {/*    iconIncrease="+"*/}
            {/*    iconDecrease="-"*/}
            {/*    label="My NOT so flexible counter"*/}
            {/*    hideLabel={false}*/}
            {/*    hideIncrease={false}*/}
            {/*    hideDecrease={false}*/}
            {/*/>*/}

            <Counter>
                <Counter.Label>My super flexible counter</Counter.Label>
                <Counter.Increase icon="+"/>
                <Counter.Decrease icon="-"/>
                <Counter.Count/>
            </Counter>

            {/* props를 탈부착(?) 가능한 컴포넌트로 분리했기때문에 재사용성 & 유연성이 좋다. */}
            <div>
                <Counter>
                    <Counter.Label>My super flexible counter</Counter.Label>
                    <Counter.Increase icon="⬆"/>
                    <Counter.Decrease icon="⬇"/>
                    <div>
                        <Counter.Count/>
                    </div>
                </Counter>
            </div>
        </div>
    );
}