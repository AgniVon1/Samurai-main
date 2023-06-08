import React from 'react';
import {useNavigate} from "react-router-dom";
import s from "./usersList.module.css"
import ava from "../../../assets/imges/photo.jpg"
import {useAppSelector} from "../../../store/hooks/useAppSelector";
import {selectIsFetching, selectUsers} from "../../../store/users/user-selectors";
import {useAppDispatch} from "../../../store/hooks/useAppDispatch";
import {follow, unFollow} from "../../../store/users/users-reducer";

export const UsersList: React.FC = () => {
    const isFetching = useAppSelector(selectIsFetching)
    const users = useAppSelector(selectUsers)
    const dispatch = useAppDispatch()
    const unFollowHandler = (id: string) => {
        dispatch(unFollow(id))
    }
    const followHandler = (id: string) => {
        dispatch(follow(id))
    }

    const navigate = useNavigate()

    const redirectToProfileHandler = (id: string) => {
        navigate('/profile/' + id)
    }
    const redirectToDialogHandler = (id: string) => {
        navigate('/dialogs/' + id)
    }
    return (
        <> {
            users.map((u) =>
                <div key={u.id} className={s.wrapper}>
                    <div className={s.avaBlock}>
                        <label onClick={() => redirectToProfileHandler(u.id)}>
                            <div className={s.imgWrapper}>
                                <img alt={u.name + "-avatar"} src={u.photos.small ? u.photos.small : ava}/>
                            </div>
                        </label>
                        <div className={s.btnWrapper}>
                            {u.followed ?
                                <>
                                    <button disabled={isFetching} onClick={() => unFollowHandler(u.id)}>Unfollow
                                    </button>
                                    <button onClick={() => redirectToDialogHandler(u.id)}>Mess</button>
                                </>
                                :

                                <button disabled={isFetching} onClick={() => followHandler(u.id)}>Follow</button>

                            }
                        </div>
                    </div>
                    <div className={s.infoBlock}>
                        <div className={s.infoMain}>
                            <div className={s.fullname}>{u.name}</div>
                            <div className={s.status}>Status: {u.status ? u.status : "..."}</div>
                        </div>
                        <div className={s.location}>
                            Location:
                            <div>user.location.city user.location.city</div>
                        </div>
                    </div>
                </div>)
        }
        </>
    )
}



