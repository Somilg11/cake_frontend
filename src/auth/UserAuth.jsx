import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/user.context';

const UserAuth = ({ children }) => {
    const { user } = useContext(UserContext);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token || !user) {
            navigate('/login', { replace: true });
        } else {
            setLoading(false);
        }
    }, [user, navigate]);

    if (loading) {
        return <div>Loading...</div>; // Or replace with a spinner component
    }

    return <>{children}</>;
};

export default UserAuth;
