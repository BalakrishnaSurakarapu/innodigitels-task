import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-page1',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './page1.component.html',
  styleUrl: './page1.component.css'
})
export class Page1Component {
  form: FormGroup;
  otpVisible = false;
  constructor(private fb: FormBuilder, private router: Router,private dataService: DataService) {
    this.form = this.fb.group({
      mobile: ['', [Validators.required,this.mobileValidator, Validators.pattern(/^[6-9]\d{9}$/)]], ///^\d{10}$
      email: ['', [Validators.required, Validators.email]],
      otp: ['1234', [Validators.required, Validators.pattern(/^1234$/)]],
    });
  }
  onMobileInput() {
    if (this.form.controls['mobile'].valid) {
      this.otpVisible = true;
    }
  }
  // mobileValidator(control: AbstractControl) {
  //   const value = control.value;
  //   const mobileRegex = /^[6-9]\d{9}$/;
  //   if (!value) return null;
  //   return mobileRegex.test(value) ? null : { invalidMobile: true };
  // }
  mobileValidator(control: AbstractControl): ValidationErrors | null {
    const value: string = control.value;
    const errors: ValidationErrors = {};
  
    if (!value) return null; // Let 'required' validator handle empty input
    else if (!/^[6-9]/.test(value)) {
      errors['invalidStart'] = true;
    }
    else if (!/^\d{10}$/.test(value)) {
      errors['invalidLength'] = true;
    }  
  
    return Object.keys(errors).length ? errors : null;
  }
  
  onSubmit() {
    if (this.form.valid) {
      this.dataService.setPageData('page1', this.form.value);
      this.router.navigate(['/page2'],
      { state: { page1Data: this.form.value } });
    }
  }
}
