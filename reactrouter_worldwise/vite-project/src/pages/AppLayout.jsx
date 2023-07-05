import Sidebar from "../components/Sidebar.jsx";
import styles from './AppLayout.module.css';
import Map from "../components/Map.jsx";
import User from "../components/User.jsx";
import React, {useEffect} from "react";
import {useAuth} from "../context/FakeAuthContext.jsx";
import {useNavigate} from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute.jsx";

function AppLayout() {
    return (
        <div className={styles.app}>
            <User/>
            <Sidebar/>
            <Map/>
        </div>
    );
}

export default AppLayout;