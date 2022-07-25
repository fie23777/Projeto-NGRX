import { Routes } from "@angular/router";
import { DetailComponent } from "../input-output/detail/detail.component";
import { InputOutputComponent } from "../input-output/input-output.component";
import { StatisticComponent } from "../input-output/statistic/statistic.component";


export const dashboardRouter: Routes = [
  {path: '', component: StatisticComponent},
  {path: 'input-output', component: InputOutputComponent},
  {path: 'detail', component: DetailComponent},
]
