import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-page3',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './page3.component.html',
  styleUrl: './page3.component.css'
})
export class Page3Component {
  form: FormGroup;
  page2Data: any;
  previousData: any;
  
  constructor(private fb: FormBuilder, private router: Router,private dataService: DataService) {
    this.previousData = this.dataService.getFormData();
    this.form = this.fb.group({
      users: this.fb.array([
        this.createUserFormGroup(),
      ]),
    });
  }

  get users(): FormArray {
    return this.form.get('users') as FormArray;
  }

  createUserFormGroup(): FormGroup {
    return this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  addUser() {
    this.users.push(this.createUserFormGroup());
  }

  removeUser(index: number) {
    this.users.removeAt(index);
  }

  onSubmit() {
    if (this.form.valid) {
      this.dataService.setPageData('page3', this.form.value.users);
      this.router.navigate(['/page4'])
    }
  }
}
