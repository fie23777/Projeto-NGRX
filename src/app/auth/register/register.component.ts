import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app-reducer';
import { AuthService } from 'src/app/service/auth.service';
import { isLoading, stopLoading } from 'src/app/shared/actions';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formulario!: FormGroup;
  loading: boolean = false;
  constructor(private fb:FormBuilder,
              private autServer: AuthService,
              private router: Router,
              private store: Store<AppState>) { }

  ngOnInit(): void {
    this.formulario = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    })
    this.store.select('loading').subscribe(loading => {
      this.loading = loading.isLoading;
    })
  }

  criarUsuario(){
    if(this.formulario.invalid){return;}
     this.store.dispatch(isLoading())
    const {name, email, password} = this.formulario.value
    this.autServer.createUser(name, email, password)
    .then(autenticacao => {
      this.store.dispatch(stopLoading())
      console.log(autenticacao);
      this.router.navigate(['/'])
    })
    .catch(err =>       {
      this.store.dispatch(stopLoading())
      // Swal.fire({
      //   title: 'Error!',
      //   text: err.message,
      //   icon: 'error',
      //   confirmButtonText: 'Cool'
      // })
    })
  }

}
