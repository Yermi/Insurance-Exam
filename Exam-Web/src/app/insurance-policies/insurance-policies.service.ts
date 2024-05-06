import { Injectable } from '@angular/core';
import { InsurancePolicy } from './models/InsurancePolicy.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InsurancePoliciesService {
  
  constructor(private http: HttpClient) { }
  
  getInsurancePoliciesByUserId(userId: string): Observable<InsurancePolicy[]> {
    return this.http.get<InsurancePolicy[]>(environment.apiUrl + 'InsurancePolicies/user/' + userId);
  }

  getPolicyById(policyId: string): Observable<InsurancePolicy> {
    return this.http.get<InsurancePolicy>(environment.apiUrl + 'InsurancePolicies/' + policyId);
  }

  addPolicy(policy: InsurancePolicy) {
    return this.http.post(environment.apiUrl + 'InsurancePolicies', policy);
  }

  updatePolicy(policy: InsurancePolicy, policyId: string) {
    return this.http.put(environment.apiUrl + 'InsurancePolicies/' + policyId, policy);
  }

  addOrUpdatePolicy(policy: InsurancePolicy, isUpdate: boolean, policyId: string) {
    return isUpdate ? this.updatePolicy(policy, policyId) : this.addPolicy(policy);
  }

  deletePolicy(policyId: any) {
    return this.http.delete(environment.apiUrl + 'InsurancePolicies/' + policyId);
  }
}
