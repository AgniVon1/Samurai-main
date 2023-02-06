import React, {useEffect} from 'react';

import {Header} from "./Header";
import {connect} from "react-redux";
import {setAuthUserData} from "../../redux/auth-reducer";
import {rootStateType} from "../../redux/redux-store";
import {authAPI} from "../../api/api";


export type HeaderPropsType = {
    isAuth:boolean,
    login:string,
    setAuthUserData:(id:number,email:string,login:string) => void,
}


const HeaderContainer:React.FC<HeaderPropsType> = (props) => {
    useEffect(() => {
        authAPI.me().then(data => {
               data.resultCode === 0 && setAuthUserData(
                   data.data.id,
                   data.data.login,
                   data.data.email)
            })
    }, );

    return (
        <Header {...props}/>
    );
};

const mapStateToProps = (state:rootStateType) => ({
    isAuth:state.auth.isAuth,
    login:state.auth.data.login,
})
export default connect(mapStateToProps,{setAuthUserData})(HeaderContainer)