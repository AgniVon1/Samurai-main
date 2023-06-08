import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectIsAuth} from "../../store/auth/auth-selectors";

export const useAuthRedirect = () => {
    const navigate = useNavigate()
    const isAuth = useSelector(selectIsAuth)
    useEffect(() => {
        if (!isAuth) navigate('/login');
    }, [isAuth])
};

