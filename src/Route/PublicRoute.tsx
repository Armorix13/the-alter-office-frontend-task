import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const token = localStorage.getItem("token");

    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            navigate('/home');
        }
    }, [token]);
    return <>{children}</>;
};

export default PublicRoute;
