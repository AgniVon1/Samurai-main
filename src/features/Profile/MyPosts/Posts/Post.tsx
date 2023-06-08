import React from 'react';
import s from './post.module.css'
import {useAppSelector} from "../../../../store/hooks/useAppSelector";
import {selectProfile} from "../../../../store/profile/profile-selectors";
import ava from "../../../../assets/imges/photo.jpg"
import {useAppDispatch} from "../../../../store/hooks/useAppDispatch";
import {addLikePost} from "../../../../store/profile/profile-reducer";


type PropsType = {
    post: { id: string, message: string, likeCounts: number ,isMyLike:boolean,date:string},
}

export const Post:React.FC<PropsType> = ({post}) => {

    const dispatch = useAppDispatch()
    const profile = useAppSelector(selectProfile)
    const likeHandler = () => dispatch(addLikePost(post.id))

    const avatarImg = profile?.photos.small ? profile?.photos.small : ava
    const likeClassName = post.isMyLike ? `${s.likes} ${s.active}` : s.likes
    const resultLikeCount = post.isMyLike ? post.likeCounts + 1 : post.likeCounts

    return (
        <div className={s.post}>
            <div className={s.author}>
                <div className={s.avatarWrapper}>
                    <img alt={"avatar"} src={avatarImg}/>
                </div>
                <div className={s.authorInfo}>
                    <div className={s.name}>{profile?.fullName}</div>
                    <div className={s.date}>{post.date}</div>
                </div>
            </div>
            <div className={s.messageText}>
                {post.message}
            </div>
            <div className={s.postLikeWrapper}>
                <div onClick={likeHandler} className={likeClassName}>
                    <div className={s.likeSvgWrapper}>
                        <svg viewBox="0 0 52 48.35">
                            <path
                                d="M51.91,16.24C51.15,7.89,45.24,1.83,37.84,1.83a14,14,0,0,0-12,6.9,13.47,13.47,0,0,0-11.69-6.9C6.76,1.83.85,7.89.09,16.24a14.8,14.8,0,0,0,.44,5.48,23.5,23.5,0,0,0,7.2,12L25.84,50.17,44.27,33.73a23.5,23.5,0,0,0,7.2-12A14.8,14.8,0,0,0,51.91,16.24Z"
                                transform="translate(0 -1.83)"/>
                        </svg>
                    </div>
                    <div className={s.likesCount}>{resultLikeCount}</div>
                </div>
            </div>
        </div>
    );
};

