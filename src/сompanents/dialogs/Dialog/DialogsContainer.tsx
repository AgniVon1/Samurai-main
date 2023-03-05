import React from 'react';
import {connect} from "react-redux";
import {Dialogs} from "../Dialogs";
import {changeTextNewMessAC, sendNewMessAC} from "../../../redux/dialog-reducer";
import {ActionType} from "../../../redux/state";
import {rootStateType} from "../../../redux/redux-store";
import {WithAuthRedirect} from "../../../hoc/withAuthRedirect";
import {compose} from "redux";
import {withRouter} from "react-router-dom";
import {ProfileContainer} from "../../profile/ProfileContainer";


const mapDispatchToProps = (dispatch: (a: ActionType) => void) => ({
    sendNewMess: () => {
        dispatch(sendNewMessAC())
    },
    changeTextNewMess: (text: string) => {
        dispatch(changeTextNewMessAC(text))
    }
});

const mapStateToProps = (state: rootStateType) => ({
    dialogPage: state.dialogPage,
    isAuth:state.auth.isAuth,
});


export default
compose<React.ComponentType>(
  connect(mapStateToProps, mapDispatchToProps),
  WithAuthRedirect)(Dialogs)

