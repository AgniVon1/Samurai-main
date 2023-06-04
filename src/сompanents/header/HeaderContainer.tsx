import React from 'react';
import {Header} from "./Header";
import {connect} from "react-redux";
import {logout} from "../../store/auth/auth-reducer";
import {RootStateType} from "../../store/store";



type PropsType = {
    logout:() => void,
    isAuth:boolean,
    login:string|null,
}


const HeaderContainer:React.FC<PropsType> = (props) => {
    return (
        <Header {...props}/>
    );
};

const mapStateToProps = (state:RootStateType) => ({
    isAuth:state.auth.isAuth,
    login:state.auth.login,
})
export default connect(mapStateToProps,{logout})(HeaderContainer)
