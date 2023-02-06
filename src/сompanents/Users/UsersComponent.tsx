import React from 'react';
import {UsersType, UserType} from "../../redux/users-reducer";
import s from "../Users/users.module.css"
import axios from "axios";
import {NavLink} from "react-router-dom";
import {API} from "../../api/api";

type UsersPropsType =UsersType & {
    followUser: (id: string) => void,
    unFollowUser: (id: string) => void,
    setUsers: (users: Array<UserType>) => void,
    setCurrentPage: (page:number) => void,
    setTotalUsersCount: (count:number) => void,
}


export const UsersComponent: React.FC<UsersPropsType> = (props) =>{
    const pagesCount = props.totalUserCount/props.pageSize
    const pages = []
    for (let i = 1;i <=  pagesCount ;i++) {
        pages.push(i)
    }

    return (
        <div>
            {props.users.map((u) => <div key={u.id}>
                 <span>
                       <NavLink to = {'/profile/'+ u.id}>
                           <img src={u.photos.small}/>
                       </NavLink>
                     {
                         u.followed
                             ? <button onClick={() =>{
                                 API.unFollow(u.id).then(data => {
                                         data.resultCode === 0 &&  props.unFollowUser(u.id)
                                     })
                                }
                             }>Unfollow</button>
                             : <button onClick={() => {
                                 API.follow(u.id).then( data => {
                                         data.resultCode === 0 &&  props.followUser(u.id)
                                     })
                                }
                             }>Follow</button>
                     }
                  </span>
                <span>
        <span>
            <div>{u.name}</div>
             <div>{u.status}</div>
        </span>
        <span>
        </span>
           </span>
            </div>)}
            <div>
                {pages.map(p=>{
                    return <span className= { (props.currentPage === p) ?s.selectedPage:''} onClick={() => props.setCurrentPage(p)}> {p}</span>
                })}
            </div>
        </div>
    );
}









