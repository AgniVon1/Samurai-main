import React from 'react';
import styles from './navbar.module.css'
import {NavLink} from "react-router-dom";


export const Navbar = () => {
    return (
        <nav className={styles.navbar}>
            <div className={styles.item}>
                <NavLink to="/profile">Profile</NavLink>
            </div>
            <div className={styles.item}>
                <NavLink to="/dialogs">Diologs</NavLink>
            </div>
        </nav>
    );
};

