import { Action, createReducer, on } from '@ngrx/store';
import { isLoading, stopLoading } from './actions'

export interface Estado{
   isLoading: boolean;
}

export const initialState: Estado = {
  isLoading: false
};

 const _statusReducer = createReducer(
  initialState,

  on(isLoading, state => ({...state, isLoading: true})),
  on(stopLoading, state => ({...state, isLoading: false})),

);

export function statusReducer(status: Estado | undefined, action: Action){
   return _statusReducer(status, action)
}
