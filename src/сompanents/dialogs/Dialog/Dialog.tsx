import styles from "../dialogs.module.css";
import {NavLink} from "react-router-dom";
import React from "react";

type DialogType = {
    id:string,
    name:string
}

export const Dialog:React.FC<DialogType> = (props) => {
    return(
        <div className={styles.dialog + ' ' + styles.active}>
            <NavLink to={"/dialogs/" + props.id}>{props.name}</NavLink>
        </div>
    )
}