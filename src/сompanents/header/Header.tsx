import React from 'react';
import styles from './header.module.css'
import {NavLink} from "react-router-dom";

type PropsType = {
    logout:() => void,
    isAuth:boolean,
    login:string|null,
}
export const Header: React.FC<PropsType> = ({login, isAuth, logout}) => {
    return (
        <div className={styles.header}>
            <div className={styles.header__img}>
                <div className={styles.header__imgItem}>
                    <img
                        src={"https://e7.pngegg.com/pngimages/847/907/png-clipart-anakin-skywalker-galactic-empire-sith-decal-star-wars-star-wars-logo-monochrome.png"}
                        alt={"Logo"}
                    />
                </div>
            </div>
            <div className={styles.loginBlock}>
                {isAuth ? (<div>
                        <NavLink to={'/profile'}>
                            {login}
                        </NavLink>
                        <button onClick={logout}>
                            LogOut
                        </button>
                    </div>

                ) : (
                    <NavLink to={'/login'}>
                        Login
                    </NavLink>
                )}
            </div>
        </div>
    );
};
