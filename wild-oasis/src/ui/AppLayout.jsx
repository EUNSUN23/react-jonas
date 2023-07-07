import {Outlet} from "react-router-dom";

function AppLayout() {
    return (
        <div>
            <p>AppLayout</p>
            <Outlet/> {/* layout route의 child route컴포넌트 위치 */}
        </div>
    );
}

export default AppLayout;