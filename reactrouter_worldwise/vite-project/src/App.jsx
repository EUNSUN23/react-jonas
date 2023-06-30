import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Product from "./pages/Product.jsx";
import Pricing from "./pages/Pricing.jsx";
import HomePage from "./pages/HomePage.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="product" element={<Product/>}/>
                <Route path="pricing" element={<Pricing/>}/>
                <Route path="*" element={<PageNotFound/>}/> {/* 위 path에 모두 해당하지 않는 url에 매칭 */}
            </Routes>
        </BrowserRouter>
    );
}

export default App;