import { Routes } from "@angular/router";
import { DetailComponent } from "../entrada-saida/detail/detail.component";
import { EntradaSaidaComponent } from "../entrada-saida/entrada-saida.component";
import { StatisticComponent } from "../entrada-saida/statistic/statistic.component";


export const dashboardRouter: Routes = [
  {path: '', component: StatisticComponent},
  {path: 'entrada-saida', component: EntradaSaidaComponent},
  {path: 'detail', component: DetailComponent},
]
