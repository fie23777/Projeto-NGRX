import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { EntradaSaidaComponent } from './entrada-saida.component';
import { StatisticComponent } from './statistic/statistic.component';
import { DetailComponent } from './detail/detail.component';
import { EntradaSaidaPipesPipe } from '../pipes/entrada-saida-pipes.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { NgChartsModule } from 'ng2-charts';
import { AppRouterModule } from '../app-routing';



@NgModule({
  declarations: [
    DashboardComponent,
    EntradaSaidaComponent,
    StatisticComponent,
    DetailComponent,
    EntradaSaidaPipesPipe,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    NgChartsModule,
    AppRouterModule
  ]
})
export class EntradaSaidaModule { }
