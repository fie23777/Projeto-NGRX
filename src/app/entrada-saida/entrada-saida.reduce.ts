import { Action, createReducer, on } from '@ngrx/store';
import { EntradaSaida } from '../models/input-output.model';

import {getEntrataSaida, setEntradaSaida} from './entrada-saida.actions'

export interface IEntradaSaida{
  entradasSaidas: EntradaSaida[];
}


export const initialState: IEntradaSaida = {
  entradasSaidas: [],
};
const _statusEntradaSaidaReducer = createReducer(
  initialState,

  on(getEntrataSaida, state => ({...state, entradasSaidas: []})),
  on(setEntradaSaida, (state,  {entradasSaidas} ) => ({...state, entradasSaidas: [...entradasSaidas]})),

);

export function statusEntradaSaidaReducer(status: IEntradaSaida | undefined, action: Action){
   return _statusEntradaSaidaReducer(status, action)
}
