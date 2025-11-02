import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from './login';
import { ListPage } from './list';
import { DetailPage } from './detail';
import { RickAndMortyPage } from './rickAndMorty';
import { OrganizationProvider } from './context/OrganizationContext';

export const App = () => {
    return (
        <OrganizationProvider>
            <Router>
                <Routes>
                    {/* <Route path="/" element={<LoginPage />} /> */}
                    <Route path="/" element={<ListPage />} />
                    <Route path="/list" element={<ListPage />} />
                    <Route path="/detail/:id" element={<DetailPage />} />
                    <Route path="/rickandmorty" element={<RickAndMortyPage />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </Router>
        </OrganizationProvider>
    );
};
