import React from 'react';
import {connect} from "react-redux";
import {Dialogs} from "../Dialogs";
import {DialogActionType, sendNewMessAC} from "../../../store/dialog/dialog-reducer";

import {RootStateType} from "../../../redux/redux-store";
import {WithAuthRedirect} from "../../../hoc/withAuthRedirect";
import {compose} from "redux";



const mapDispatchToProps = (dispatch: (a: DialogActionType) => void) => ({
    sendNewMess: (newMess:string) => {
        dispatch(sendNewMessAC(newMess))
    },
});

const mapStateToProps = (state: RootStateType) => ({
    dialogPage: state.dialogPage,
});


export default
compose<React.ComponentType>(
  connect(mapStateToProps, mapDispatchToProps),
  WithAuthRedirect)(Dialogs)

