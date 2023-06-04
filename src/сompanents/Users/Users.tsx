import React, {useEffect} from 'react';

import axios from "axios";
import {NavLink} from "react-router-dom";
import {UserType} from "../../store/users/users-reducer";

type UsersPropsType = {
    users: Array<UserType>,
    pageSize:number,
    totalUserCount:number,
    followUser: (id: string) => void,
    unFollowUser: (id: string) => void,
    setUsers: (users: Array<UserType>) => void,
    setCurrentPage: (page:number) => void,
}

export const Users: React.FC<UsersPropsType> = ({users,pageSize,totalUserCount, followUser, unFollowUser, setUsers,setCurrentPage}) => {

    const getUsers = () => {
        !users.length && axios.get("https://social-network.samuraijs.com/api/1.0/users")
            .then(response => {
                setUsers(response.data.items)
            })
    }
    useEffect(getUsers)

    return (
        <div>
            {users.map((u) => <div key={u.id}>
                 <span>
                     <div>
                         <NavLink to = {'/profile/'+ u.id}><img src={u.photos.small}/></NavLink>
                     </div>
                       {
                           u.followed
                                ? <button onClick={() => unFollowUser(u.id)}>Unfollow</button>
                                 : <button onClick={() => followUser(u.id)}>Follow</button>
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
            <button onClick={getUsers}></button>
        </div>
    );
};

