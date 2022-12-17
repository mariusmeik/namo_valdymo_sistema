import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Floor from './Floor';
import LoginPage from './Login';
import FloorsPage from './FloorsPage';
import RegisterPage from './Register';
import FlatsPage from './FlatsPage';
import Flat from './Flat';

function AppRoutes() {
    return (
        <Routes>
            <Route path="/Register" element={<RegisterPage/>} />
            <Route path="/FloorsPage" element={<FloorsPage />} />
            <Route path="/Floors/:floorId" element={<Floor />} />
            <Route path="/FloorsPage/:floorId/Flats" element={<FlatsPage />} />
            <Route path="/FloorsPage/:floorId/Flats/:flatId" element={<Flat />} />
            
            <Route path="/" element={<LoginPage />} />
            {/* <Route path="*" element={<PageNotFoundPage />} />  */}
        </Routes>
    );
}

export default AppRoutes;