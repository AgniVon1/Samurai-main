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

export class UsersClassComponent extends React.Component<UsersPropsType>{
    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.setUsers(response.data.items)
                this.props.setTotalUsersCount(response.data.totalCount)
            })
    }
    onPageChanged = (p:number) =>{
        this.props.setCurrentPage(p)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${p}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.setUsers(response.data.items)
            })
    }

    render() {
        const pagesCount = this.props.totalUserCount/this.props.pageSize
        const pages = []
        for (let i = 1;i <=  pagesCount ;i++) {
            pages.push(i)
        }
        return <div>
              {this.props.users.map((u) => <div key={u.id}>
                 <span>
                  <img src={u.photos.small}/>
                     {
                         u.followed
                             ? <button onClick={() => this.props.unFollowUser(u.id)}>Unfollow</button>
                             : <button onClick={() => this.props.followUser(u.id)}>Follow</button>
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
                    return <span className= { (this.props.currentPage === p) ?s.selectedPage:''} onClick={() => this.onPageChanged(p)}> {p}</span>
                })}
            </div>
        </div>
    }
}




