import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

import 'firebase/firestore';
import { Router } from '@angular/router';
import { map, Subscription } from 'rxjs';
import { Usuario } from '../models/user.model';
import {
  AngularFirestore,
} from '@angular/fire/compat/firestore';
import { Store } from '@ngrx/store';
import { AppState } from '../app-reducer';
import { setUser, unSetUser } from '../auth/auth-actions';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  userSubscription!: Subscription

  constructor(
    private auth: AngularFireAuth,
    private angularfsService: AngularFirestore,
    private router: Router,
    private store: Store<AppState>
  ) {}

  initAuthUser() {
    return this.auth.authState.subscribe((user) => {
   this.userSubscription =  this.angularfsService
        .doc(`${user?.uid}/usuario`)
        .valueChanges()
        .subscribe((usuario:any) => {
          if(usuario){
            const user =  Usuario.fronFireBase(usuario)
            this.store.dispatch(setUser({usuario}))
          }else{
            this.store.dispatch(unSetUser())
            this.userSubscription.unsubscribe();
          }
        });
    });
  }

  createUser(name: string, email: string, password: string) {
    return this.auth
      .createUserWithEmailAndPassword(email, password)
      .then(({ user }) => {
        const newUser = new Usuario(user!.uid, name, email);
        const tutRef = this.angularfsService.doc(`${user!.uid}/usuario`);
        return tutRef.set({ ...newUser });
      });
  }

  getLogin(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.auth.signOut().then(() => this.router.navigate(['/login']));
  }

  isLogin() {
    return this.auth.authState.pipe(map((fireUser) => fireUser !== null));
  }
}
