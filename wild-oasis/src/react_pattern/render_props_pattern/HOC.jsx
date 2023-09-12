import { useState } from "react";

// * HOC를 어떻게 사용하는지는 몰라도 되지만 뭔지는 알아두면 좋다.
// 컴포넌트를 PROPS로 받아서 새 컴포넌트를 반환한다.
export default function withToggles(WrappedComponent) {
    return function List(props) {
        const [isOpen, setIsOpen] = useState(true);
        const [isCollapsed, setIsCollapsed] = useState(false);

        const displayItems = isCollapsed ? props.items.slice(0, 3) : props.items;

        function toggleOpen() {
            setIsOpen((isOpen) => !isOpen);
            setIsCollapsed(false);
        }

        return (
            <div className="list-container">
                <div className="heading">
                    <h2>{props.title}</h2>
                    <button onClick={toggleOpen}>
                        {isOpen ? <span>&or;</span> : <span>&and;</span>}
                    </button>
                </div>
                {isOpen && <WrappedComponent {...props} items={displayItems} />}

                <button onClick={() => setIsCollapsed((isCollapsed) => !isCollapsed)}>
                    {isCollapsed ? `Show all ${props.items.length}` : "Show less"}
                </button>
            </div>
        );
    };
}
