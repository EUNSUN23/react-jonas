import {NavLink} from "react-router-dom";
import styles from './PageNav.module.css';

function PageNav() {
    return (
        <nav className={styles.nav}>
            <ul>
                <li><NavLink to="/">Home</NavLink></li> {/* Link와 차이 : NavLink는 활성화 상태의 className을 제공한다. */}
                <li><NavLink to="/pricing">Pricing</NavLink></li>
                <li><NavLink to="/product">Product</NavLink></li>
            </ul>
        </nav>
    );
}

export default PageNav;