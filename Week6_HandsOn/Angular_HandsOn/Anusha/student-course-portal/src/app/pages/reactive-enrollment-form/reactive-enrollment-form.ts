import { CommonModule } from '@angular/common';

import {
  AbstractControl,
  AsyncValidatorFn,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';

import {
  Component,
  OnInit
} from '@angular/core';

import {
  CourseService
} from '../../services/course';

/*
 * Custom synchronous validator.
 *
 * It rejects course codes beginning with "XX".
 *
 * Examples:
 * XX101 -> invalid
 * ANG101 -> valid
 */
export function noCourseCode(): ValidatorFn {
  return (
    control: AbstractControl
  ): ValidationErrors | null => {

    const value = String(
      control.value ?? ''
    )
      .trim()
      .toUpperCase();

    if (value.startsWith('XX')) {
      return {
        noCourseCode: true
      };
    }

    return null;
  };
}

/*
 * Custom asynchronous validator.
 *
 * It simulates checking whether an email
 * address is already registered.
 *
 * Any email containing "test@" is treated
 * as unavailable.
 */
export function simulateEmailCheck():
  AsyncValidatorFn {

  return (
    control: AbstractControl
  ): Promise<ValidationErrors | null> => {

    return new Promise(resolve => {
      setTimeout(() => {
        const email = String(
          control.value ?? ''
        )
          .trim()
          .toLowerCase();

        if (email.includes('test@')) {
          resolve({
            emailTaken: true
          });
        } else {
          resolve(null);
        }
      }, 800);
    });
  };
}

@Component({
  selector:
    'app-reactive-enrollment-form',

  imports: [
    CommonModule,
    ReactiveFormsModule
  ],

  templateUrl:
    './reactive-enrollment-form.html',

  styleUrl:
    './reactive-enrollment-form.css'
})
export class ReactiveEnrollmentForm
  implements OnInit {

  enrollForm!: FormGroup;

  submitted = false;

  isSubmitting = false;

  successMessage = '';

  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private courseService: CourseService
  ) {
  }

  ngOnInit(): void {
    this.enrollForm = this.fb.group({
      studentName: [
        '',
        [
          Validators.required,
          Validators.minLength(3)
        ]
      ],

      studentEmail: this.fb.control(
        '',
        [
          Validators.required,
          Validators.email
        ],
        [
          simulateEmailCheck()
        ]
      ),

      /*
       * This field is used as the course code.
       *
       * Examples:
       * ANG101
       * JAVA201
       */
      courseId: [
        '',
        [
          Validators.required,
          noCourseCode()
        ]
      ],

      preferredSemester: [
        'Odd',
        Validators.required
      ],

      agreeToTerms: [
        false,
        Validators.requiredTrue
      ],

      additionalCourses:
        this.fb.array([])
    });
  }

  /*
   * Returns the additionalCourses control
   * as a properly typed FormArray.
   */
  get additionalCourses():
    FormArray {

    return this.enrollForm.get(
      'additionalCourses'
    ) as FormArray;
  }

  get studentNameControl():
    AbstractControl | null {

    return this.enrollForm.get(
      'studentName'
    );
  }

  get studentEmailControl():
    AbstractControl | null {

    return this.enrollForm.get(
      'studentEmail'
    );
  }

  get courseIdControl():
    AbstractControl | null {

    return this.enrollForm.get(
      'courseId'
    );
  }

  get semesterControl():
    AbstractControl | null {

    return this.enrollForm.get(
      'preferredSemester'
    );
  }

  get termsControl():
    AbstractControl | null {

    return this.enrollForm.get(
      'agreeToTerms'
    );
  }

  addCourse(): void {
    const courseControl =
      new FormControl(
        '',
        Validators.required
      );

    this.additionalCourses.push(
      courseControl
    );
  }

  removeCourse(
    index: number
  ): void {

    this.additionalCourses
      .removeAt(index);
  }

  onSubmit(): void {
    this.successMessage = '';
    this.errorMessage = '';

    if (
      this.enrollForm.invalid ||
      this.enrollForm.pending
    ) {
      this.enrollForm
        .markAllAsTouched();

      return;
    }

    this.isSubmitting = true;

    const courseCode = String(
      this.enrollForm.value.courseId
    )
      .trim()
      .toUpperCase();

    const studentName = String(
      this.enrollForm.value.studentName
    ).trim();

    const newCourse = {
      name:
        `${studentName}'s ${courseCode} Course`,

      code: courseCode,

      credits: 3,

      gradeStatus:
        'pending' as const
    };

    this.courseService
      .createCourse(newCourse)
      .subscribe({
        next: createdCourse => {
          console.log(
            'Created course:',
            createdCourse
          );

          this.submitted = true;

          this.successMessage =
            `Course ${createdCourse.name} created successfully.`;

          /*
           * Marks the form as saved so that the
           * CanDeactivate guard does not show an
           * unsaved-changes warning.
           */
          this.enrollForm
            .markAsPristine();
        },

        error: error => {
          console.error(
            'Course creation failed:',
            error
          );

          this.errorMessage =
            error.message ??
            'Failed to create the course.';

          this.isSubmitting = false;
        },

        complete: () => {
          this.isSubmitting = false;
        }
      });
  }

  resetForm(): void {
    this.enrollForm.reset({
      studentName: '',
      studentEmail: '',
      courseId: '',
      preferredSemester: 'Odd',
      agreeToTerms: false
    });

    this.additionalCourses.clear();

    this.submitted = false;
    this.isSubmitting = false;
    this.successMessage = '';
    this.errorMessage = '';
  }

  /*
   * Used by the CanDeactivate guard from
   * Hands-On 7.
   */
  canLeavePage(): boolean {
    if (
      this.enrollForm.dirty &&
      !this.submitted
    ) {
      return window.confirm(
        'You have unsaved changes. Leave?'
      );
    }

    return true;
  }
}
