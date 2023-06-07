import s from './app.module.css';

import React, {useEffect} from "react";
import {connect} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "../../store/app/app-reducer";
import {Preloader} from "../../common/UI/Preloader/Preloader";
import {RootStateType} from "../../store/store";
import {Navbar} from "../layout/Navbar/Navbar";
import {AppRoutes} from "./Routes/Routes";
import {Header} from "../layout/Header/Header";

type PropsType = {
    isInitApp: boolean,
    initializeApp: () => void
}

const App: React.FC<PropsType> = ({isInitApp, initializeApp}) => {

    useEffect(() => {
        initializeApp()
    }, []);

    if (!isInitApp) return (<Preloader/>)

    return (
            <div className={s.gird}>
                <Header/>
                <Navbar/>
                <AppRoutes/>
            </div>
    );
}

const mapStateToProps = (state: RootStateType) => ({
    isInitApp: state.app.initialized
})

export default compose<React.ComponentType>(
    /*withRouter,*/
    connect(mapStateToProps, {initializeApp}),)
(App)

