import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Home from '../pages/Home/Home';
import Cadastro from '../pages/Cadastro/Cadastro';
import Colchao from '../pages/Colchao/Colchao';

const AppRouter = () => {
    return (
        <>
            <CssBaseline />
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/cadastro" element={<Cadastro />} />
                    <Route path="colchao/:id" element={<Colchao />} />
                </Routes>
            </Router>
        </>
    );
};

export default AppRouter;
