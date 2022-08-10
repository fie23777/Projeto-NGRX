import { Action, createReducer, on } from '@ngrx/store';
import { isLoading, stopLoading } from './actions'

export interface Estado{
   loading: boolean;
}

export const initialState: Estado = {
    loading: false
};

 const _statusReducer = createReducer(
  initialState,

  on(isLoading, state => ({...state, loading: true})),
  on(stopLoading, state => ({...state, loading: false})),

);

export function statusReducer(status: Estado | undefined, action: Action){
   return _statusReducer(status, action)
}
