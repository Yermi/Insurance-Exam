import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InsurancePoliciesRoutingModule } from './insurance-policies-routing.module';
import { InsurancePoliciesComponent } from './components/insurance-policies/insurance-policies.component';
import { MaterialModule } from '../material/material.module';
import { InsurancePolicyComponent } from './components/insurance-policy/insurance-policy.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NativeDateAdapter } from '@angular/material/core';
import { PoliciesFilterPipe } from './pipes/policies-filter.pipe';


@NgModule({
  declarations: [
    InsurancePoliciesComponent,
    InsurancePolicyComponent,
    PoliciesFilterPipe
  ],
  imports: [
    CommonModule,
    InsurancePoliciesRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: [NativeDateAdapter]
})
export class InsurancePoliciesModule { }
