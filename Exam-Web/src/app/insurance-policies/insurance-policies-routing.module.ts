import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InsurancePoliciesComponent } from './components/insurance-policies/insurance-policies.component';
import { insurancePoliciesResolver } from './resolvers/insurance-policies.resolver';
import { InsurancePolicyComponent } from './components/insurance-policy/insurance-policy.component';
import { policyResolver } from './resolvers/policy.resolver';

const routes: Routes = [
  {
    path: 'user/:userId',
    component: InsurancePoliciesComponent,
    resolve: {
      insurancePolicies: insurancePoliciesResolver
    }
  },
  {
    path: 'user/:userId/new',
    component: InsurancePolicyComponent
  },
  {
    path: 'user/:userId/policy/:policyId',
    component: InsurancePolicyComponent,
    resolve: {
      policy: policyResolver
    }
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InsurancePoliciesRoutingModule { }
