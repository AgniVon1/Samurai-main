import {RootStateType} from "../store";

export const selectDialogs = (state: RootStateType) => state.dialog.dialogs
export const selectCurrentDialog = (state: RootStateType) => state.dialog.currentDialog