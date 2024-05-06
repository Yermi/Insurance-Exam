import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'users',
    loadChildren: () => import("../app/users/users.module").then(m => m.UsersModule)
  },
  {
    path: 'insurance-policies',
    loadChildren: () => import("../app/insurance-policies/insurance-policies.module").then(m => m.InsurancePoliciesModule)

  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
