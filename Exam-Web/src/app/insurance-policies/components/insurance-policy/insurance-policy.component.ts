import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { InsurancePoliciesService } from '../../insurance-policies.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';

@Component({
  selector: 'app-insurance-policy',
  templateUrl: './insurance-policy.component.html',
  styleUrls: ['./insurance-policy.component.scss']
})
export class InsurancePolicyComponent implements OnInit {

  loading: boolean = false;
  isUpdateMode: boolean = false;
  policyForm: FormGroup = this.fb.group({
    policyNumber: ['', [Validators.required, Validators.maxLength(8)]],
    insuranceAmount: ['', [Validators.required, Validators.min(0)]],
    startDate: [null, [Validators.required]],
    endDate: [null, [Validators.required]],
    userId: ['']
  });

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private toaster: ToasterService,
    private policiesService: InsurancePoliciesService) { }

  ngOnInit(): void {
    this.policyForm.get('userId')?.setValue(this.route.snapshot.params['userId']);
    if (this.route.snapshot.data['policy']) {
      this.policyForm.patchValue(this.route.snapshot.data['policy']);
      this.isUpdateMode = true;
    }
  }

  onSubmit() {
    if (this.policyForm.invalid) {
      this.toaster.showToaster('Fill in all fields', false);
      return;
    }
    this.loading = true;
    this.policiesService.addOrUpdatePolicy(this.policyForm.getRawValue(), this.isUpdateMode, this.route.snapshot.params['policyId']).subscribe({
      next: () => this.toaster.showToaster('Policy saved'),
      error: () => this.toaster.showToaster('Error saving policy'),
      complete: () => this.loading = false
    });
  }

}
