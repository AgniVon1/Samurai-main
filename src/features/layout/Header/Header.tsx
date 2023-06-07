import React, {useEffect} from 'react';
import s from './header.module.css'
import {NavLink, useNavigate} from "react-router-dom";
import logo from "../../../assets/imges/myLogo.png"
import {useAppDispatch} from "../../../store/hooks/useAppDispatch";
import {useAppSelector} from "../../../store/hooks/useAppSelector";
import {selectIsAuth, selectLogin} from "../../../store/auth/auth-selectors";
import {logout} from "../../../store/auth/auth-reducer";

export const Header: React.FC = () => {
    const dispatch = useAppDispatch()
    const login = useAppSelector(selectLogin)
    const isAuth = useAppSelector(selectIsAuth)

    const logoutHandler = () => {
        dispatch(logout())
    }
    return (
        <header className={s.header}>
            <div className={s.imgWrapper}>
                <img
                    src={logo}
                    alt={"Logo"}
                />
            </div>
            <div className={s.title}>
                <h1>Shumelka</h1>
            </div>
            <div className={s.loginBlock}>
                <NavLink to={'/login'}> {isAuth? login: <p>Sing in</p> }</NavLink>
                {isAuth && <button onClick={logoutHandler}>Logout</button>}
            </div>
        </header>
    );
};
