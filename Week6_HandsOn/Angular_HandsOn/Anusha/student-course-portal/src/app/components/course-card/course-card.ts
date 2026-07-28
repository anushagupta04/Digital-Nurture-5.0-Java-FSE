import { CommonModule } from '@angular/common';

import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';

import {
  Course
} from '../../models/course.model';

import {
  EnrollmentService
} from '../../services/enrollment';

import {
  CreditLabel
} from '../../pipes/credit-label-pipe';

@Component({
  selector: 'app-course-card',
  imports: [
    CommonModule,
    CreditLabel
  ],
  templateUrl: './course-card.html',
  styleUrl: './course-card.css'
})
export class CourseCard
  implements OnChanges {

  @Input()
  course!: Course;

  @Output()
  enrollRequested =
    new EventEmitter<number | string>();

  isExpanded = false;

  isEnrolled = false;

  isSubmitting = false;

  enrollmentId:
    number | string | null = null;

  constructor(
    private enrollmentService:
    EnrollmentService
  ) {
  }

  ngOnChanges(
    changes: SimpleChanges
  ): void {

    if (changes['course']) {
      console.log(
        'Current course:',
        changes['course'].currentValue
      );
    }
  }

  requestEnrollment(): void {
    if (this.isSubmitting) {
      return;
    }

    this.isSubmitting = true;

    if (
      this.isEnrolled &&
      this.enrollmentId !== null
    ) {
      this.enrollmentService
        .unenroll(this.enrollmentId)
        .subscribe({
          next: () => {
            this.isEnrolled = false;
            this.enrollmentId = null;

            this.enrollRequested.emit(
              this.course.id
            );
          },

          error: error => {
            console.error(error);
          },

          complete: () => {
            this.isSubmitting = false;
          }
        });

      return;
    }

    this.enrollmentService
      .enroll(this.course.id)
      .subscribe({
        next: enrollment => {
          this.isEnrolled = true;

          this.enrollmentId =
            enrollment.id;

          this.enrollRequested.emit(
            this.course.id
          );
        },

        error: error => {
          console.error(error);
        },

        complete: () => {
          this.isSubmitting = false;
        }
      });
  }

  toggleDetails(): void {
    this.isExpanded =
      !this.isExpanded;
  }

  get cardClasses():
    Record<string, boolean> {

    return {
      'card--enrolled':
      this.isEnrolled,

      'card--full':
        this.course.credits >= 4,

      expanded:
      this.isExpanded
    };
  }

  get borderColour(): string {
    switch (
      this.course.gradeStatus
      ) {
      case 'passed':
        return 'green';

      case 'failed':
        return 'red';

      default:
        return 'grey';
    }
  }
}
