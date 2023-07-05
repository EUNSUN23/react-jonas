import React from 'react';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Product from "./pages/Product.jsx";
import Pricing from "./pages/Pricing.jsx";
import HomePage from "./pages/HomePage.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";
import AppLayout from "./pages/AppLayout.jsx";
import Login from "./pages/Login.jsx";
import CityList from "./components/CityList.jsx";
import CountryList from "./components/CountryList";
import City from "./components/City.jsx";
import Form from "./components/Form.jsx";
import {CitiesProvider} from "./context/CitiesContext.jsx";
import {AuthProvider} from "./context/FakeAuthContext";
import ProtectedRoute from "./pages/ProtectedRoute.jsx";


function App() {
    return (
        <AuthProvider>
            <CitiesProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<HomePage/>}/>
                        <Route path="product" element={<Product/>}/>
                        <Route path="pricing" element={<Pricing/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="app" element={
                            <ProtectedRoute>
                                <AppLayout/>
                            </ProtectedRoute>
                        }> {/* nested routes */}
                            <Route index
                                   element={<Navigate to='cities'
                                                      replace/>}/> {/* root path (/app)에 대한 매칭 */} {/* Navigate : cities로 리다이렉팅 replace : history 대체 */}
                            <Route path='cities' element={<CityList/>}/>
                            <Route path='cities/:id' element={<City/>}/> {/* :id -> parameter와 매칭되는 key가 된다. */}
                            <Route path='countries' element={<CountryList/>}/>
                            <Route path='form' element={<Form/>}/>
                        </Route>
                        <Route path="*" element={<PageNotFound/>}/> {/* 위 path에 모두 해당하지 않는 url에 매칭 */}
                    </Routes>
                </BrowserRouter>
            </CitiesProvider>
        </AuthProvider>

    );
}

export default App;