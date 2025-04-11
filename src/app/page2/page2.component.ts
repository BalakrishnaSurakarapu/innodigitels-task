import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-page2',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './page2.component.html',
  styleUrl: './page2.component.css'
})
export class Page2Component {
  form: FormGroup;previousData: any; page1Data: any;

  constructor(private fb: FormBuilder, private router: Router,private dataService: DataService) {
    this.previousData = this.dataService.getFormData();
    this.form = this.fb.group({
      name: ['', Validators.required],
      pan: ['', [Validators.required, Validators.pattern(/^[A-Za-z0-9]{10}$/)]],
      dob: ['', [Validators.required, Validators.pattern(/^\d{4}-\d{2}-\d{2}$/)]],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.dataService.setPageData('page2', this.form.value);
      this.router.navigate(['/page3'],
      );
    }
  }
}
