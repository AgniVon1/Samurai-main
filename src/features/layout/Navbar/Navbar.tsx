import React from 'react';
import styles from './navbar.module.css'
import {NavLink} from "react-router-dom";
import s from "./navbar.module.css"
import {callBack} from "../utils/callBack";
import {useAppSelector} from "../../../store/hooks/useAppSelector";
import {selectAuthUserId} from "../../../store/auth/auth-selectors";


export const Navbar = () => {
    const id = useAppSelector(selectAuthUserId)
    return (<nav className={styles.navbar}>
        <NavLink to={'/profile/'+ id} className={callBack}>
            <div className={s.item}> My Profile</div>
        </NavLink>
        <NavLink to="/dialogs" className={callBack}>
            <div className={s.item}>Dialogs</div>
        </NavLink>
        <NavLink to="/users" className={callBack}>
            <div className={s.item}>Users</div>
        </NavLink>
        <NavLink to="/chat" className={callBack}>
            <div className={s.item}>Group Chat</div>
        </NavLink>
    </nav>)
}


