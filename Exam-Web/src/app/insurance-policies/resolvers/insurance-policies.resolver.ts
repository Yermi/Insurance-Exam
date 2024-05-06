import { ResolveFn } from '@angular/router';
import { InsurancePolicy } from '../models/InsurancePolicy.model';
import { InsurancePoliciesService } from '../insurance-policies.service';
import { inject } from '@angular/core';

export const insurancePoliciesResolver: ResolveFn<InsurancePolicy[]> = (route, state) => {
  return inject(InsurancePoliciesService).getInsurancePoliciesByUserId(route.params['userId']);
};
