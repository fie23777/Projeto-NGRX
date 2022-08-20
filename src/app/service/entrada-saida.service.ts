import { Injectable } from '@angular/core';


import 'firebase/firestore';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from './auth.service';
import { map } from 'rxjs';
import { EntradaSaida } from '../models/input-output.model';

@Injectable({
  providedIn: 'root'
})
export class EntradaSaidaService {

  constructor(private fireBaseSaidaService: AngularFirestore,
              private userService: AuthService) { }

  criarEntradaSaida(entradaSaida: EntradaSaida){
    const uid = this.userService.usuario.uid;
    return this.fireBaseSaidaService.doc(`${uid}/entrada-saida`)
                             .collection('items').add({...entradaSaida})
  }
  entradaSaidaListener(uid: any){
   return this.fireBaseSaidaService.collection(`${uid}/entrada-saida/items`)
                             .snapshotChanges()
                             .pipe(map(snapshot =>
                                       snapshot.map(item =>
                                                            ({
                                                              uid: item.payload.doc.id,
                                                              ...item.payload.doc.data() as any
                                                            })
                                                   )
                                      )
                                  )
  }

  deleteItems(idItem: string | undefined){
    const uid = this.userService.usuario.uid;
   return this.fireBaseSaidaService.doc(`${uid}/entrada-saida/items/${idItem}`).delete()
  }
}
