import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { getItem } from '../../utils/utils';

const PublicRoute = () => {
    const token = getItem('token');
    return token ? <Navigate to="/landingPage" /> : <Outlet />;
};

export default PublicRoute;
