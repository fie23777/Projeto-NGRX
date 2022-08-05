import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formulario!: FormGroup;

  constructor(private fb:FormBuilder, private autServer: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.formulario = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    })
  }

  criarUsuario(){
    if(this.formulario.invalid){return;}
    const {name, email, password} = this.formulario.value
    this.autServer.createUser(name, email, password)
    .then(autenticacao => {
      console.log(autenticacao);
      this.router.navigate(['/'])
    })
    .catch(err =>       {
      Swal.fire({
        title: 'Error!',
        text: err.message,
        icon: 'error',
        confirmButtonText: 'Cool'
      })
    })
  }

}
