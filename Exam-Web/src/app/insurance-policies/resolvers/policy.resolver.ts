import { ResolveFn } from '@angular/router';
import { InsurancePolicy } from '../models/InsurancePolicy.model';
import { inject } from '@angular/core';
import { InsurancePoliciesService } from '../insurance-policies.service';

export const policyResolver: ResolveFn<InsurancePolicy> = (route, state) => {
  return inject(InsurancePoliciesService).getPolicyById(route.params['policyId']);
};
