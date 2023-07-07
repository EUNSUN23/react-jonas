import {Outlet} from "react-router-dom";
import Sidebar from "./Sidebar.jsx";
import Header from "./Header.jsx";

function AppLayout() {
    return (
        <div>
            <Sidebar/>
            <Header/>
            <main> {/* 컨텐츠 영역 container */}
                <Outlet/> {/* layout route의 child route컴포넌트 위치 */}
            </main>

        </div>
    );
}

export default AppLayout;