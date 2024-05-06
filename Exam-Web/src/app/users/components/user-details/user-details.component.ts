import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../../users.service';
import { ActivatedRoute } from '@angular/router';
import { ToasterService } from 'src/app/shared/services/toaster.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  loading: boolean = false;
  isUpdate: boolean = false;
  userForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(50)]],
    email: ['', [Validators.required, Validators.email]],
    id: ['', [Validators.required, Validators.maxLength(9)]]
  });

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private toaster: ToasterService,
    private userService: UsersService) { }

  ngOnInit(): void {
    if (this.route.snapshot.data['user']) {
      this.userForm.patchValue(this.route.snapshot.data['user']);
      this.userForm.get('id')?.disable();
      this.isUpdate = true;
    }
  }

  onSubmit() {
    if (this.userForm.invalid) {
      this.toaster.showToaster('Fill in all fields', false);
      return;
    }
    this.loading = true;
    this.userService.addOrUpdateUser(this.userForm.getRawValue(), this.isUpdate).subscribe({
      next: () => this.toaster.showToaster('User saved'),
      error: () => this.toaster.showToaster('Error saving user'),
      complete: () => this.loading = false
    });
  }

}
