import {ActionReducerMap} from '@ngrx/store'
import  * as apiReducer from './shared/reducer'
import  * as apiReducerUser from './auth/auth-reduce'

export interface AppState{
  loading: apiReducer.Estado,
  usuario: apiReducerUser.IUsuario
}

export const appReducer: ActionReducerMap<AppState> = {
  loading: apiReducer.statusReducer,
  usuario: apiReducerUser.statusReducerUser
}
