import React from 'react';
import styles from './dialogs.module.css'
import {Dialog} from "./Dialog/Dialog";
import {Message} from "./Dialog/Message";
import { v1 } from "uuid"


export const Dialogs = () => {

    let messages =[
        {id: v1() , text: "cooбщение0"},
        {id: v1() , text: "cooбщение1"},
        {id: v1() , text: "cooбщение2"},
        {id: v1() , text: "cooбщение3"},
        {id: v1() , text: "cooбщение4"},
        {id: v1() , text: "cooбщение5"},
        {id: v1() , text: "cooбщение6"},
    ]

    let diologs = [
        {id: v1() , name: "Mark"},
        {id: v1() , name: "Tom"},
        {id: v1() , name: "Mercava"},
    ]

    const mappedMessages = messages.map((m) =>  <Message message =  {m}/>)
    const mappedDiologs = diologs.map((d) =>  <Dialog id= {d.id} name = {d.name}/>)

    return (
        <div className={styles.dialogs}>
            <div className={styles.dialogs_items}>
                {mappedDiologs}
            </div>
            <div className={styles.messages}>
                {mappedMessages}
            </div>
        </div>
    );
};
