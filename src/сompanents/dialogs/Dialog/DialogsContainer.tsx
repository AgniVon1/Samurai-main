import React from 'react';
import {connect} from "react-redux";
import {Dialogs} from "../Dialogs";
import {changeTextNewMessAC, sendNewMessAC} from "../../../redux/dialog-reducer";
import {ActionType, StateType} from "../../../redux/state";


const mapDispatchToProps = (dispatch: (a: ActionType) => void) => ({
    sendNewMess: () => {
        dispatch(sendNewMessAC())
    },
    changeTextNewMess: (text: string) => {
        dispatch(changeTextNewMessAC(text))
    }
});

const mapStateToProps = (state: StateType) => ({
    dialogPage: state.dialogPage,
});

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs)

export default DialogsContainer;