import React, {useEffect} from 'react';

import {Header} from "./Header";
import {connect} from "react-redux";
import { getAuthUserDataTC} from "../../redux/auth-reducer";
import {RootStateType} from "../../redux/redux-store";


export type HeaderPropsType = {
    isAuth:boolean,
    login:string,
    setAuthUserData:() => void,
}


const HeaderContainer:React.FC<HeaderPropsType> = (props) => {
    useEffect(() => {
        props.setAuthUserData()
    }, );

    return (
        <Header {...props}/>
    );
};

const mapStateToProps = (state:RootStateType) => ({
    isAuth:state.auth.isAuth,
    login:state.auth.data.login,
})
export default connect(mapStateToProps,{setAuthUserData:getAuthUserDataTC})(HeaderContainer)