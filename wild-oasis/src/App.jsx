import styled from "styled-components";

// 리액트 컴포넌트를 반환한다.
// jsx props를 받을 수 있다.
const H1 = styled.h1`
  font-size: 30px;
  font-weight: 600;
`;

const Button = styled.button`
  font-size: 1.4rem;
  padding: 1.2rem 1.6rem;
  font-weight: 500;
  border: none;
  border-radius: 7px;
  background-color: purple;
  color: white;
  margin: 20px;
  cursor: pointer;
`;

const Input = styled.input`
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 0.8rem 1.2rem;
`

// 이미 존재하는 App을 스타일링할때에는 Styled컴포넌트명 이 관례.
const StyledApp = styled.main`
  background-color: orangered;
  padding: 20px;
`

function App() {
    return (
        <StyledApp>
            <H1>The wild oasis</H1>
            <Button>Check in</Button>
            <Button>Check out</Button>
            <Input type='number' placeholder='Number of guests'/>
        </StyledApp>
    );
}

export default App;
