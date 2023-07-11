import styled from "styled-components";

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

import {HiXMark} from "react-icons/hi2";
import {createPortal} from "react-dom";

// * React portal - 돔tree 상에서의 요소 렌더링 위치를 컴포넌트 트리상의 컴포넌트의 위치와 다르게 하는 portal.
// Modal에 portal을 쓰는 이유 :
// overflow:hidden이 적용된 위치에 Modal을 사용하면 Modal이 cut-off 될 수 있는데,
// 이런 경우를 대비해서 아예 Modal은 돔트리 최상단에 렌더링 되도록 하는 것이다.
function ModalV1({children, onClose}) {
    return createPortal(
        <Overlay>
            <StyledModal>
                <Button onClick={onClose}><HiXMark/></Button>
                <div>
                    {children}
                </div>
            </StyledModal>
        </Overlay>,
        document.body // jsx를 렌더링할 돔요소 -> 돔트리상에서 body의 direct child가 된다(react의 root요소 바깥에 위치하게 됨)
    );
}

export default ModalV1;
