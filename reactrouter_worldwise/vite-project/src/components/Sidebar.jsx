import styles from './Sidebar.module.css';
import Logo from "./Logo.jsx";
import AppNav from "./AppNav.jsx";

function Sidebar() {
    return (
        <div className={styles.sidebar}>
            <Logo/>
            <AppNav/>
            <p>List of cites</p>
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