import {ActionReducerMap} from '@ngrx/store'
import  * as apiReducer from './shared/reducer'
import  * as apiReducerUser from './auth/auth-reduce'
import  * as apiEntradaSaida  from './entrada-saida/entrada-saida.reduce'

export interface AppState{
  loading: apiReducer.Estado;
  usuario: apiReducerUser.IUsuario;
  entradasSaidas: apiEntradaSaida.IEntradaSaida;
}

export const appReducer: ActionReducerMap<AppState> = {
  loading: apiReducer.statusReducer,
  usuario: apiReducerUser.statusReducerUser,
  entradasSaidas: apiEntradaSaida.statusEntradaSaidaReducer,
}
