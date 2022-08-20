import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AppState } from 'src/app/app-reducer';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-sidbar',
  templateUrl: './sidbar.component.html',
  styleUrls: ['./sidbar.component.css']
})
export class SidbarComponent implements OnInit, OnDestroy {

  nomeUsuario: any = ''
  userSubs!: Subscription
  constructor(private serverLogin: AuthService, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.select('usuario').pipe( filter(({usuario}) => usuario != null))
                                .subscribe(({usuario}) => this.nomeUsuario = usuario?.nome)
  }

  logout(){
    this.serverLogin.logout();
  }

  ngOnDestroy(): void {
    this.userSubs.unsubscribe();
 }

}
