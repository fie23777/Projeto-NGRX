import { Action, createReducer, on } from '@ngrx/store';
import { Usuario } from '../models/user.model';
import { setUser, unSetUser } from './auth-actions'

export interface IUsuario{
   usuario: Usuario | null;
}

export const initialStateUser: IUsuario = {
    usuario: null
};

 const _statusReducerUsuario = createReducer(
  initialStateUser,

  on(setUser, (state, {usuario}) => ({...state, usuario: usuario})),
  on(unSetUser, state => ({...state, usuario: null})),

);

export function statusReducerUser(status: IUsuario | undefined, action: Action){
   return _statusReducerUsuario(status, action)
}
