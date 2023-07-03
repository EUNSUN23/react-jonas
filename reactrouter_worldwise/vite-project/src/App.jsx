import {BrowserRouter, Route, Routes} from "react-router-dom";
import Product from "./pages/Product.jsx";
import Pricing from "./pages/Pricing.jsx";
import HomePage from "./pages/HomePage.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";
import AppLayout from "./pages/AppLayout.jsx";
import Login from "./pages/Login.jsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="product" element={<Product/>}/>
                <Route path="pricing" element={<Pricing/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="app" element={<AppLayout/>}> {/* nested routes */}
                    <Route index element={<p>LIST</p>}/> {/* root path (/app)에 대한 매칭 */}
                    <Route path='cities' element={<p>List of cities</p>}/>
                    <Route path='countries' element={<p>Countries</p>}/>
                    <Route path='form' element={<p>Form</p>}/>
                </Route>
                <Route path="*" element={<PageNotFound/>}/> {/* 위 path에 모두 해당하지 않는 url에 매칭 */}
            </Routes>
        </BrowserRouter>
    );
}

export default App;