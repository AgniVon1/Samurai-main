import React, {useEffect} from 'react';
import styles from './dialogs.module.css'
import {Dialog} from "./Dialog/Dialog";
import {useAppDispatch} from "../../store/hooks/useAppDispatch";
import {useAppSelector} from "../../store/hooks/useAppSelector";
import {selectDialogs} from "../../store/dialog/dialog-selectors";
import {fetchDialogs} from "../../store/dialog/dialog-reducer";
import {useAuthRedirect} from "../../common/hooks/useAuthRedirect";


export const Dialogs: React.FC = () => {

    const dispatch = useAppDispatch()
    const dialogs = useAppSelector(selectDialogs)

    useAuthRedirect()

    useEffect(() => {
        dispatch(fetchDialogs())
    }, [])

    useEffect(() => {
        const timer = setInterval(() => {
            dispatch(fetchDialogs())
        }, 30000);
        return () => clearInterval(timer);
    });

    const mappedDialogs = dialogs.map((d) => <Dialog key = {d.id} dialog = {d}/>)

    return (
        <div className={styles.dialogs}>
            <div className={styles.dialogs_items}>
                {mappedDialogs}
            </div>
        </div>
    );
};


