import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, Routes } from '@angular/router';

import { AppState } from 'src/app/app-reducer';

import { AuthService } from 'src/app/service/auth.service';

import { Store } from '@ngrx/store';

import Swal from 'sweetalert2'
import { isLoading, stopLoading } from 'src/app/shared/actions';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  loading: boolean = false;

  loadingSubscription!: Subscription

  formLogin!: FormGroup;
  constructor(private fb:FormBuilder,
              private autServer: AuthService,
              private router: Router,
              private store: Store<AppState>) { }


  ngOnInit(): void {
   this.formLogin = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.loadingSubscription = this.store.select('loading').subscribe(loading => {
      this.loading = loading.loading,
      console.log('Carregando subs')
    })
  }

  validarLogin(){
    if(this.formLogin.invalid){return;}
    // Swal.fire({
    //   title: 'Auto close alert!',
    //   html: 'I will close in <b></b> milliseconds.',
    // })
    this.store.dispatch(isLoading())
    const {email, password} = this.formLogin.value
    this.autServer.getLogin(email, password)
   .then(() => {
    // Swal.fire({
    //   didOpen: () => {
    //     //Swal.close()
        this.store.dispatch(stopLoading())
    //   }
    // })
        this.router.navigate(['/'])
        }
        )
    .catch(err =>
      {
        this.store.dispatch(stopLoading())
        Swal.fire({
          title: 'Error!',
          text: err.message,
          icon: 'error',
          confirmButtonText: 'Cool'
        })
      })

  }

  ngOnDestroy(): void {
   this.loadingSubscription.unsubscribe() // desincrever o observable
  }

}
