import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    useEffect(() => {
        if (!token) {
            navigate('/');
        }
    }, [token]);

    if (!token) {
        return null;
    }
    return <>{children}</>;
};

export default ProtectedRoute;
