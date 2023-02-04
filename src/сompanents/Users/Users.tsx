import React from 'react';
import {UserType} from "../../redux/users-reducer";
import {v1} from "uuid";

type UsersPropsType = {
    users: Array<UserType>,
    followUser: (id: string) => void,
    unFollowUser: (id: string) => void,
    setUsers: (users: Array<UserType>) => void,
}

export const Users: React.FC<UsersPropsType> = ({users, followUser, unFollowUser, setUsers}) => {

    if (!users.length){
    setUsers([{
      id: v1(),
       avatarURL: "",
      followed: true,
      fullname: "nhcvbn",
       status: "xnbnv",
      location: {city: "xnbvx", country: "xnbvnv"}
 }],)}
    return (
        <div>
            {users.map((u) => <div key={u.id}>
                 <span>
                  <img src={u.avatarURL}/>
        {

            u.followed
                ? <button onClick={() => unFollowUser(u.id)}>Unfollow</button>
                : <button onClick={() => followUser(u.id)}>Follow</button>
        }
    </span>
                <span>
        <span>
            <div>{u.fullname}</div>
             <div>{u.status}</div>
        </span>
        <span>
            <div>{u.location.city}</div>
            <div>{u.location.country}</div>
        </span>
    </span>
            </div>)}

        </div>
    );
};

