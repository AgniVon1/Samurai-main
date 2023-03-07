import React, {Component, ComponentType} from 'react';
import {connect} from "react-redux";
import {RootStateType} from "../redux/redux-store";
import {Redirect} from "react-router-dom";


type mapStateToPropsType = {
  isAuth:boolean
}
const mapStateToProps = (state:RootStateType):mapStateToPropsType => {
  return {
    isAuth:state.auth.isAuth
  }
}
export  function WithAuthRedirect<T>(Component:ComponentType<T>)  {
  const RedirectComponent = (props:mapStateToPropsType)=>{
    let {isAuth,...restProps} = props
    console.log(isAuth)
    if (!isAuth) return <Redirect to={'/login'}/>
    return <Component {...restProps as T}/>
  }


// нужно для получения auth
  let ConnectedRedirect = connect(mapStateToProps,null)(RedirectComponent)
  return ConnectedRedirect;
}

