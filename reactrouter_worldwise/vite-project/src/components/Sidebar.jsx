import styles from './Sidebar.module.css';
import Logo from "./Logo.jsx";
import AppNav from "./AppNav.jsx";
import {Outlet} from "react-router-dom";

function Sidebar() {
    return (
        <div className={styles.sidebar}>
            <Logo/>
            <AppNav/>
            <Outlet/> {/* AppLayout컴포넌트의 nested route와 매치되는 컴포넌트 표시 */}
            <footer className={styles.footer}>
                <p className={styles.copyright}>
                    &copy; Copyright {new Date().getFullYear()}
                     by WorldWise Inc.
                </p>
            </footer>
        </div>
    );
}

export default Sidebar;