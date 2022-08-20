import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app-reducer';
import { EntradaSaida } from 'src/app/models/input-output.model';
import { EntradaSaidaService } from 'src/app/service/entrada-saida.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit, OnDestroy {

  itemsEntradaSaida: EntradaSaida[] = [];
  entradaSaidaSubs!: Subscription;
  constructor(private store: Store<AppState>, private entradaSaidaService: EntradaSaidaService) { }


  ngOnInit(): void {
  this.entradaSaidaSubs =  this.store.select('entradasSaidas').subscribe(({entradasSaidas}) => {
    if(entradasSaidas.length > 0){
      this.itemsEntradaSaida = entradasSaidas;
    }
    })
  }

  deletarEntrataSaida(uid: string | undefined){
     this.entradaSaidaService.deleteItems(uid).then( () => {
      Swal.fire('Deletado com secesso!', 'You are the rockstar!', 'info'),
      err =>  Swal.fire('Deletado com secesso!', err.mesage, 'error')
     })
  }

  ngOnDestroy(): void {
    this.entradaSaidaSubs.unsubscribe()
 }
}
