import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EntradaSaidaService } from '../service/entrada-saida.service';

import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from '../app-reducer';
import { isLoading, stopLoading } from '../shared/actions';
import { Subscription } from 'rxjs';
import { EntradaSaida } from '../models/input-output.model';
@Component({
  selector: 'app-entrada-saida',
  templateUrl: './entrada-saida.component.html',
  styleUrls: ['./entrada-saida.component.css']
})
export class EntradaSaidaComponent implements OnInit, OnDestroy{


  btnTypeIO: string = 'Entrada';
  typeBtnCss: string = 'primary';
  formEntradaSaida!: FormGroup;
  loading: boolean = false;
  loadingSub!: Subscription;

  constructor(private fb: FormBuilder,
              private entrataSaidaService: EntradaSaidaService,
              private store: Store<AppState>) { }


  ngOnInit(): void {
   this.loadingSub =  this.store.select('loading').subscribe(({isLoading}) => this.loading = isLoading);

    this.formEntradaSaida = this.fb.group({
      descricao: ['', Validators.required],
      amount: ['', Validators.required],
    }
    )
  }

  addIO(){
    this.store.dispatch(isLoading())

    const tipo = this.btnTypeIO.toLowerCase();
    const {descricao, amount} = this.formEntradaSaida.value;
    const entrataSaida = new EntradaSaida(amount,descricao, tipo)
    delete entrataSaida.uid
    this.entrataSaidaService.criarEntradaSaida(entrataSaida)
    .then(() =>{

      Swal.fire('Item adicionado com sucesso!', descricao, 'success');
      this.store.dispatch(stopLoading())
      this.formEntradaSaida.reset();
    })
    .catch(err => {
      Swal.fire('Erro!', err.message, 'warning')

      this.store.dispatch(stopLoading())
    });


  }

  typeIOF(tipo: string){
    if(tipo === 'Entrada'){
      this.btnTypeIO = 'Saida'
      this.typeBtnCss = 'warning'
    }else{
      this.btnTypeIO = 'Entrada'
      this.typeBtnCss = 'primary'

    }
  }
  ngOnDestroy(): void {
    this.loadingSub.unsubscribe()
  }

}
