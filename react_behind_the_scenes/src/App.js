import {useState} from "react";

const content = [
    {
        summary: "React is a library for building UIs",
        details:
            "Dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
        summary: "State management is like giving state a home",
        details:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
        summary: "We can think of props as the component API",
        details:
            "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    },
];

export default function App() {
    return (
        <div>
            <Tabbed content={content}/>
        </div>
    );
}

console.log(<DifferentContent test={23}/>);
// DifferentContent함수를 호출한 결과를 출력한다.
// ** DOM요소가 아니라, DOM요소 생성하기 위한 정보를 담은 리액트 엘리먼트 객체 **
//{
//      $$typeof : Symbol(react.element)
//     "key": null,
//     "ref": null,
//     "props": {
//         "test": 23
//     },
//     "_owner": null,
//     "_store": {}
// }

// $$typeof : cross-site 공격을 방지하기 위해서, react엘리먼트의 타입은 json으로 전송되지 못하는 Symbol타입이다.


function Tabbed({content}) {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <div>
            <div className="tabs">
                <Tab num={0} activeTab={activeTab} onClick={setActiveTab}/>
                <Tab num={1} activeTab={activeTab} onClick={setActiveTab}/>
                <Tab num={2} activeTab={activeTab} onClick={setActiveTab}/>
                <Tab num={3} activeTab={activeTab} onClick={setActiveTab}/>
            </div>

            {activeTab <= 2 ? (
                <TabContent item={content.at(activeTab)}/>
            ) : (
                <DifferentContent/>
            )}
        </div>
    );
}

function Tab({num, activeTab, onClick}) {
    return (
        <button
            className={activeTab === num ? "tab active" : "tab"}
            onClick={() => onClick(num)}
        >
            Tab {num + 1}
        </button>
    );
}

function TabContent({item}) {
    const [showDetails, setShowDetails] = useState(true);
    const [likes, setLikes] = useState(0);

    console.log("RENDER");

    function handleInc() {
        // 단일 setState는 batch되지 않기때문에 아래처럼 사용해도 상관없지만, handleInc 자체가 여러번 호출되는 상황이 생기는 등
        // 어떤 상황이 생길지 모르니, 현재 state를 기반으로 update할때에는 '무조건' 콜백함수를 사용하자.
        // setLikes(likes + 1);

        setLikes(likes => likes + 1);
    }


    function handleTripleInc() {
        // state-batching으로 인해 아래의 likes는 모두 동일한 값이다.
        // setLikes(likes + 1);
        // setLikes(likes + 1);
        // setLikes(likes + 1);

        // 최신(현재) state를 기반으로 setState
        setLikes(likes => likes + 1);
        setLikes(likes => likes + 1);
        setLikes(likes => likes + 1);
    }

    function handleUndo() {
        setShowDetails(true);
        setLikes(0);
        console.log(likes); // 위 setState하기 이전값 출력
        // **state batching**
        // 이벤트 핸들러 내부의 setState들은
        // 비동기로 일괄 처리되므로 바뀐 state값을 바로 사용할 수 없다.

        // *바뀌게 될 state가 현재 state와 동일하면 리액트는 컴포넌트 함수를 호출하지 않는다(렌더링x)
    }

    function handleUndoLater() {
        setTimeout(handleUndo, 2000);
        // React ~ 17 : (handleUndo)일반함수 안에서 호출한 setState는 batching되지 않는다. --> 업데이트된 likes 출력.
        // React 18 ~ : (handleUndo)일반함수 안에서 호출한 setState도 batching된다. --> 업데이트 안된 likes 출력
    }

    return (
        <div className="tab-content">
            <h4>{item.summary}</h4>
            {showDetails && <p>{item.details}</p>}

            <div className="tab-actions">
                <button onClick={() => setShowDetails((h) => !h)}>
                    {showDetails ? "Hide" : "Show"} details
                </button>

                <div className="hearts-counter">
                    <span>{likes} ❤️</span>
                    <button onClick={handleInc}>+</button>
                    <button onClick={handleTripleInc}>+++</button>
                </div>
            </div>

            <div className="tab-undo">
                <button onClick={handleUndo}>Undo</button>
                <button onClick={handleUndoLater}>Undo in 2s</button>
            </div>
        </div>
    );
}

function DifferentContent() {
    return (
        <div className="tab-content">
            <h4>I'm a DIFFERENT tab, so I reset state 💣💥</h4>
        </div>
    );
}