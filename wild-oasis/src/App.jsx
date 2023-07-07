import styled from "styled-components";
import GlobalStyles from "./styles/GlobalStyles.js";
import Button from "./ui/Button.jsx";
import Input from "./ui/Input.jsx";
import Heading from "./ui/Heading.jsx";

// 리액트 컴포넌트를 반환한다.
// jsx props를 받을 수 있다.


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
                <Heading as="h1">The wild oasis</Heading>
                <Heading as="h2">Check in and out</Heading>
                <Button>Check in</Button>
                <Button>Check out</Button>
                <Heading as="h3">Form</Heading> {/*h3요소로 렌더링됨*/}
                <Input type='number' placeholder='Number of guests'/>
            </StyledApp>
        </>
    );
}

export default App;
