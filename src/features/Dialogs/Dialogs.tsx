import React, {useEffect} from 'react';
import styles from './dialogs.module.css'
import {Dialog} from "./Dialog/Dialog";
import {useAppDispatch} from "../../store/hooks/useAppDispatch";
import {useAppSelector} from "../../store/hooks/useAppSelector";
import {selectDialogs} from "../../store/dialog/dialog-selectors";
import {fetchDialogs} from "../../store/dialog/dialog-reducer";
import {useAuthRedirect} from "../../common/hooks/useAuthRedirect";
import {Messages} from "./Dialog/Messages";
import {fetchProfile} from "../../store/profile/profile-reducer";
import {selectUserId} from "../../store/profile/profile-selectors";
import {selectAuthUserId} from "../../store/auth/auth-selectors";


export const Dialogs: React.FC = () => {

    const dispatch = useAppDispatch()
    const dialogs = useAppSelector(selectDialogs)
    const userId = useAppSelector(selectAuthUserId)

    useAuthRedirect()

    useEffect(() => {
        dispatch(fetchDialogs())
        dispatch(fetchProfile(userId))
    }, [])

    useEffect(() => {
        const timer = setInterval(() => {
            dispatch(fetchDialogs())
        }, 15000);
        return () => clearInterval(timer);
    });

    const mappedDialogs = dialogs.map((d) => <Dialog key = {d.id} dialog = {d}/>)

    return (
        <div className={styles.dialogs}>
            <div className={styles.dialogs_items}>
                {mappedDialogs}
            </div>
            <Messages/>
        </div>
    );
};


