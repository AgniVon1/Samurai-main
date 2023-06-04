import React from 'react';
import {UsersType, UserType} from "../../redux/users-reducer";
import s from "../Users/users.module.css"
import {NavLink} from "react-router-dom";
import ava from "../../assets/imges/Ellipse45.png"
import {Paginator} from "../../common/UI/Pagination/Paginator";


type UsersPropsType = UsersType & {
  followUser: (id: string) => void,
  unFollowUser: (id: string) => void,
  setUsers: (users: Array<UserType>) => void,
  setCurrentPage: (page: number) => void,
  setTotalUsersCount: (count: number) => void,
}


export const UsersComponent: React.FC<UsersPropsType> = (props) => {

  return (
    <div>
      {props.users.map((u) => <div key={u.id}>
                 <span>
                       <NavLink to={'/profile/' + u.id}>
                           <img  alt={ava} src={u.photos.small}/>
                       </NavLink>
                   {
                     u.followed
                       ? <button onClick={() => {
                         props.unFollowUser(u.id)
                       }
                       }>Unfollow</button>
                       : <button onClick={() => {
                         props.followUser(u.id)
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
        <Paginator pageSize={4} totalUsersCount={ props.totalUserCount} currentPage={props.currentPage } onChangePageHandler={props.setCurrentPage} numberOfPagesInBlock={15} />
      </div>
    </div>
  );
}









