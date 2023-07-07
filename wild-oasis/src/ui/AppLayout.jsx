import {Outlet} from "react-router-dom";
import Sidebar from "./Sidebar.jsx";
import Header from "./Header.jsx";
import styled from "styled-components";

const Main = styled.main`
  background-color: green;
  padding: 4rem 4.8rem 6.4rem;
`

function AppLayout() {
    return (
        <div>
            <Header/>
            <Sidebar/>
            <Main> {/* 컨텐츠 영역 container */}
                <Outlet/> {/* layout route의 child route컴포넌트 위치 */}
            </Main>
        </div>
    );
}

export default AppLayout;