import React, {useEffect} from 'react';
import {UserType} from "../../redux/users-reducer";
import {v1} from "uuid";
import axios from "axios";

type UsersPropsType = {
    users: Array<UserType>,
    followUser: (id: string) => void,
    unFollowUser: (id: string) => void,
    setUsers: (users: Array<UserType>) => void,
}

export const Users: React.FC<UsersPropsType> = ({users, followUser, unFollowUser, setUsers}) => {

   const getUsers = () => {
       !users.length && axios.get("https://social-network.samuraijs.com/api/1.0/users")
           .then(response => {
               setUsers(response.data.items)
               console.log(response.data.items[0])
           })
   }

    useEffect( getUsers
        ,[])


    return (
        <div>
            {users.map((u) => <div key={u.id}>
                 <span>
                  <img src={u.photos.small}/>
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

