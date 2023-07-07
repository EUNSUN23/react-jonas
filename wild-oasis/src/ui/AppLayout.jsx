import {Outlet} from "react-router-dom";
import Sidebar from "./Sidebar.jsx";
import Header from "./Header.jsx";
import styled from "styled-components";

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr; /*첫번째 칼럼은 26rem, 나머지 칼럼은 나머지 영역 차지*/
  grid-template-rows: auto 1fr; /*첫번째 row는 컨텐츠 사이즈, 나머지 row는 나머지 영역 차지*/
  height: 100vh;
`

const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;
`

function AppLayout() {
    return (
        <StyledAppLayout>
            <Header/>
            <Sidebar/>
            <Main> {/* 컨텐츠 영역 container */}
                <Outlet/> {/* layout route의 child route컴포넌트 위치 */}
            </Main>
        </StyledAppLayout>
    );
}

export default AppLayout;