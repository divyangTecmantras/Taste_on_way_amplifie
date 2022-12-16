import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { getItem } from '../../utils/utils';

const PrivateRouting = () => {
    const token = getItem('token');
    return token ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRouting;
