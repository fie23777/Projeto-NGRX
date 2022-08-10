import { createAction, props} from '@ngrx/store';
import { Usuario } from '../models/user.model';

export const setUser = createAction('[Load User Component]',
    props<{usuario: Usuario}>()
);
export const unSetUser = createAction('[Kill User Component]');
