import React from 'react';
import {Link} from "react-router-dom";
import PageNav from "../components/PageNav.jsx";

function HomePage() {
    return (
        <div>
            <PageNav/>
            <h1>WorldWise</h1>
            <Link to="/app">Go to the app</Link> {/* 클릭시 DOM만 업데이트 될 뿐 페이지 리로딩은 일어나지 않는다. */}
            {/*<a href="/pricing">Pricing</a> /!* 클릭시 페이지 리로딩이 일어난다 *!/*/}
        </div>
    );
}

export default HomePage;