import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

//AngularFire
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
//modules
import { AppRouterModule } from './app-routing';
import {ReactiveFormsModule} from '@angular/forms'
import { StoreDevtoolsModule } from '@ngrx/store-devtools';


import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EntradaSaidaComponent } from './entrada-saida/entrada-saida.component';
import { StatisticComponent } from './entrada-saida/statistic/statistic.component';
import { DetailComponent } from './entrada-saida/detail/detail.component';
import { FooterComponent } from './shared/footer/footer.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { SidbarComponent } from './shared/sidbar/sidbar.component';

import { StoreModule } from '@ngrx/store';

import { appReducer } from './app-reducer';
import { EntradaSaidaPipesPipe } from './pipes/entrada-saida-pipes.pipe';
import { NgChartsModule } from 'ng2-charts';
import { AuthModuleModule } from './auth/auth-module.module';
import { SharedModule } from './shared/shared.module';


@NgModule({
  declarations: [
    AppComponent,

    DashboardComponent,
    EntradaSaidaComponent,
    StatisticComponent,
    DetailComponent,
    EntradaSaidaPipesPipe,
  ],
  imports: [
    BrowserModule,
    AppRouterModule,
    ReactiveFormsModule,
    AuthModuleModule,
    SharedModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    StoreModule.forRoot(appReducer),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
    }),
    NgChartsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
