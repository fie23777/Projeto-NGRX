import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Route, Router } from '@angular/router';
import { map } from 'rxjs';
import { UserAuth } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth,
              private angularfsService: AngularFirestore,
              private router: Router) { }

  initAuthUser(){
          return this.auth.authState.subscribe(user => {
            console.log(user)
            console.log(user?.uid)
            console.log(user?.email)
          })
  }

  createUser(name:string, email:string, password:string){
      return this.auth.createUserWithEmailAndPassword(email, password)
                      .then(({user}) => {
                        if(user !== null){
                          const userAuth = new UserAuth(user.uid, name, user.email!);
                          this.angularfsService.doc(`${user.uid}/usuario`).set({...userAuth})
                        }

                      })
  }

  getLogin(email:string, password: string){
    return this.auth.signInWithEmailAndPassword(email, password)
  }

  logout(){
    return this.auth.signOut().then(() =>
    this.router.navigate(['/login']))
  }

  isLogin(){
    return this.auth.authState.pipe(map(fireUser => fireUser !== null))
  }
}
