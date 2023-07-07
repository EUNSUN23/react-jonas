import styled from "styled-components";
import GlobalStyles from "./styles/GlobalStyles.js";
import Button from "./ui/Button.jsx";
import Input from "./ui/Input.jsx";

// 리액트 컴포넌트를 반환한다.
// jsx props를 받을 수 있다.
const H1 = styled.h1`
  font-size: 30px;
  font-weight: 600;
`;



// 이미 존재하는 App을 스타일링할때에는 Styled컴포넌트명 이 관례.
const StyledApp = styled.main`
  background-color: orangered;
  padding: 20px;
`

function App() {
    return (
        <>
            <GlobalStyles/>
            <StyledApp>
                <H1>The wild oasis</H1>
                <Button>Check in</Button>
                <Button>Check out</Button>
                <Input type='number' placeholder='Number of guests'/>
            </StyledApp>
        </>
    );
}

export default App;
