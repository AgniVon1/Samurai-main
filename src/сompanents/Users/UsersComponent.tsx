import React from 'react';
import {UsersType, UserType} from "../../redux/users-reducer";
import s from "../Users/users.module.css"
import axios from "axios";

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
                      <img src={u.photos.small}/>
                     {
                         u.followed
                             ? <button onClick={() => props.unFollowUser(u.id)}>Unfollow</button>
                             : <button onClick={() => props.followUser(u.id)}>Follow</button>
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









