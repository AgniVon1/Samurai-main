import React from 'react';
import {Header} from "./Header";
import {connect} from "react-redux";
import {logout} from "../../redux/auth-reducer";
import {RootStateType} from "../../redux/redux-store";


export type HeaderPropsType = {
    logout:() => void,
    isAuth:boolean,
    login:string|null,
}


const HeaderContainer:React.FC<HeaderPropsType> = (props) => {
    return (
        <Header {...props}/>
    );
};

const mapStateToProps = (state:RootStateType) => ({
    isAuth:state.auth.isAuth,
    login:state.auth.login,
})
export default connect(mapStateToProps,{logout})(HeaderContainer)
