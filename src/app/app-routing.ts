
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./auth/login/login.component";
import { RegisterComponent } from "./auth/register/register.component";
import { DashboardComponent } from "./dashboard/dashboard.component";

import { dashboardRouter } from "./dashboard/dashboard.router";
import { AuthGuard } from "./service/auth.guard";

const router: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: '', component: DashboardComponent,
   children: dashboardRouter,
  canActivate: [AuthGuard]},
  {path: '**', redirectTo: ''}
]

@NgModule({
  imports: [RouterModule.forRoot(router)],
  exports: [RouterModule]
})

export class AppRouterModule{

}
