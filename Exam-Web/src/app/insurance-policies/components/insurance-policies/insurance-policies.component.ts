import { Component, OnInit } from '@angular/core';
import { InsurancePolicy } from '../../models/InsurancePolicy.model';
import { ActivatedRoute } from '@angular/router';
import { InsurancePoliciesService } from '../../insurance-policies.service';
import { FormControl, FormGroup } from '@angular/forms';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { DeviceDetectorService } from 'ngx-device-detector';

const today = new Date();
const day = today.getDate();
const month = today.getMonth();
const year = today.getFullYear();

@Component({
  selector: 'app-insurance-policies',
  templateUrl: './insurance-policies.component.html',
  styleUrls: ['./insurance-policies.component.scss'],
  providers: [DeviceDetectorService]
})
export class InsurancePoliciesComponent implements OnInit {

  insurancePolicies: InsurancePolicy[] = [];
  userId: string = '';
  displayFilter: boolean = false;

  colsNumber: number = 2;
  rowHeight: string = '2.4:1';

  dateRangeForm = new FormGroup({
    start: new FormControl(new Date(year, month, day)),
    end: new FormControl(new Date(year, month + 1, day)),
  });
  applyFilter: FormControl<boolean | null> = new FormControl(false);

  constructor(
    private route: ActivatedRoute,
    private toaster: ToasterService,
    private deviceService: DeviceDetectorService,
    private policiesService: InsurancePoliciesService) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.params['userId'];
    this.insurancePolicies = this.route.snapshot.data['insurancePolicies'];
    this.colsNumber = this.deviceService.isMobile() ? 1 : 2;
    this.rowHeight = this.deviceService.isMobile() ? '1.5:1' : '2.4:1';
  }

  toggleDisplayFilter() {
    this.displayFilter = !this.displayFilter;
  }

  deletePolicy(policyId: string) {
    this.policiesService.deletePolicy(policyId).subscribe({
      complete: () => {
        this.insurancePolicies = this.insurancePolicies?.filter(policy => policy.id !== policyId);
        this.toaster.showToaster('Policy deleted');
      },
      error: () => this.toaster.showToaster('Error deleting policy'),
    });
  }
}
