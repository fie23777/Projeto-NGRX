import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators'

import { AppState } from '../app-reducer';

import { Store } from '@ngrx/store';
import { setEntradaSaida } from '../entrada-saida/entrada-saida.actions';
import { EntradaSaidaService } from '../service/entrada-saida.service';
import { EntradaSaida } from '../models/input-output.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  constructor(private store: Store<AppState>,
              private entrataSaidaService: EntradaSaidaService) { }

  userSub!: Subscription;
  entradaSaidaSub!: Subscription;
  listItems!: EntradaSaida[];

  ngOnInit(): void {
    this.userSub = this.store.select('usuario').pipe(
      filter(auth => auth.usuario !== null)

    ).subscribe( ({usuario}) => {
        this.entradaSaidaSub = this.entrataSaidaService.entradaSaidaListener(usuario!.uid).subscribe((itemsFB) => {
             this.store.dispatch(setEntradaSaida({entradasSaidas: itemsFB}))
        })

    })

  }

  ngOnDestroy(): void {
   this.entradaSaidaSub.unsubscribe();
   this.userSub.unsubscribe();
  }

}
