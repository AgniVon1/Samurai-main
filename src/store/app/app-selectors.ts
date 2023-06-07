import {RootStateType} from "../store";

export const selectIsInit = (state: RootStateType) => state.app.initialized
export const selectErrorMes = (state: RootStateType) => state.app.errorMessage