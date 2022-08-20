import { createAction, props } from '@ngrx/store';
import { EntradaSaida } from '../models/input-output.model';

export const getEntrataSaida = createAction('[Get Entrada Saída Component]');

export const setEntradaSaida = createAction(
                   '[Set Entrada Saída Component]',
                   props<{ entradasSaidas: EntradaSaida[] }>());
