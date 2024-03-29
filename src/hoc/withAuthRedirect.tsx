
import React, {Component, ComponentType} from 'react';
import {connect} from "react-redux";

import {Navigate} from "react-router-dom";
import {RootStateType} from "../store/store";

type MapStateToPropsAuthRedirectType = {
  isAuth: boolean
}

const mapStateToPropsForRedirect = (state: RootStateType): MapStateToPropsAuthRedirectType => ({
  isAuth: state.auth.isAuth
});

export const WithAuthRedirect = <T, >(Component: ComponentType<T>) => {

  const AuthRedirectComponent = (props: MapStateToPropsAuthRedirectType) => {
    let {isAuth, ...restProps} = props;
    // if (!isAuth) return <Redirect to={'/login'}/>
    if (!isAuth) return <Navigate to={'/login'}/>
    return <Component {...restProps as T} />
  }
  return connect(mapStateToPropsForRedirect)(AuthRedirectComponent);
}



