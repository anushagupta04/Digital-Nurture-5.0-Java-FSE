import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-enrollment-form',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './enrollment-form.html',
  styleUrl: './enrollment-form.css'
})
export class EnrollmentForm {

  studentName = '';
  studentEmail = '';
  courseId: number | null = null;
  preferredSemester = '';
  agreeToTerms = false;

  submitted = false;

  onSubmit(form: NgForm): void {
    if (form.invalid) {
      return;
    }

    console.log('Form value:', form.value);
    console.log('Form valid:', form.valid);

    this.submitted = true;
  }

  resetForm(form: NgForm): void {
    form.resetForm({
      studentName: '',
      studentEmail: '',
      courseId: null,
      preferredSemester: '',
      agreeToTerms: false
    });

    this.submitted = false;
  }
}
