import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, Routes } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin!: FormGroup;
  constructor(private fb:FormBuilder,
              private autServer: AuthService,
              private router: Router) { }

  ngOnInit(): void {
   this.formLogin = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  validarLogin(){
    if(this.formLogin.invalid){return;}
    Swal.fire({
      title: 'Auto close alert!',
      html: 'I will close in <b></b> milliseconds.',
    })
    const {email, password} = this.formLogin.value
    this.autServer.getLogin(email, password)
   .then(() => {
    Swal.fire({
      didOpen: () => {
        Swal.close()
      }
    })
        this.router.navigate(['/'])
        }
        )
    .catch(err =>
      {
        Swal.fire({
          title: 'Error!',
          text: err.message,
          icon: 'error',
          confirmButtonText: 'Cool'
        })
      })

  }

}
