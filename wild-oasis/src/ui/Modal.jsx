import styled from "styled-components";
import {HiXMark} from "react-icons/hi2";
import {createPortal} from "react-dom";
import {cloneElement, createContext, useContext, useEffect, useRef, useState} from "react";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;


const ModalContext = createContext();

export default function Modal({children}) {
    const [openName, setOpenName] = useState('');

    const close = () => setOpenName('');
    const open = setOpenName;

    return (
        <ModalContext.Provider value={{openName, close, open}}>
            {children}
        </ModalContext.Provider>
    )

}

function Open({children, opens: opensWindowName}) {
    const {open} = useContext(ModalContext);

    // cloneElement : 요소를 복제해서 새로운 요소를 생성한다(새로운 prop추가 가능)
    // return cloneElement(children, {onClick: () => open(opensWindowName)});
    return cloneElement(children, {onClick: () => open(opensWindowName)});
}

function Window({children, name}) {
    const {openName, close} = useContext(ModalContext);
    const ref = useRef();

    // Modal 바깥영역 click 이벤트 감지 -> Modal close
    useEffect(function () {
        function handleClick(e) {
            if (ref.current && !ref.current.contains(e.target)) close();
        }

        // 이벤트리스너 등록 - Add Cabin 버튼 클릭으로 버블링되는 이벤트는 감지하지 않고, 캡처링이벤트만 감지해서 처리하기 위해 option true로 설정.
        document.addEventListener('click', handleClick, true);

        // 이벤트 리스너 제거
        return () => document.removeEventListener('click', handleClick);

    }, [close]);

    if (name !== openName) return null;
    return createPortal(
        <Overlay>
            <StyledModal ref={ref}>
                <Button onClick={close}><HiXMark/></Button>
                <div>
                    {cloneElement(children, {onCloseModal: close})}
                </div>
            </StyledModal>
        </Overlay>,
        document.body // jsx를 렌더링할 돔요소 -> 돔트리상에서 body의 direct child가 된다(react의 root요소 바깥에 위치하게 됨)
    );
}

Modal.Open = Open;
Modal.Window = Window;
