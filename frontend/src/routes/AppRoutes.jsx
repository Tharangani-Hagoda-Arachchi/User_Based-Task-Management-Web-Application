import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from '../pages/Home.jsx'
import ProtectedRoute from '../components/ProtectedRoute.jsx'
import Dashboard from '../pages/Dashboard.jsx'


const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/dashboard' element={<ProtectedRoute> <Dashboard/></ProtectedRoute>}/>
            </Routes>
        </BrowserRouter>

    )
}

export default AppRoutes