import React from 'react';
import styles from './header.module.css'


export const Header = () => {
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
        </div>
    );
};
