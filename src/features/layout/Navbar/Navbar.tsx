import React from 'react';
import styles from './navbar.module.css'
import {NavLink} from "react-router-dom";
import s from "./navbar.module.css"
import {callBack} from "../utils/callBack";


export const Navbar = () => (
    <nav className={styles.navbar}>
        <NavLink to="/profile" className={callBack}>
            <div className={s.item}>Profile</div>
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


