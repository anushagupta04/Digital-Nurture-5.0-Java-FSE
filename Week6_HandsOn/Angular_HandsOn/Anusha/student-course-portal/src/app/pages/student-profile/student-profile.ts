import {
  Component,
  OnInit
} from '@angular/core';

import {
  Course
} from '../../models/course.model';

import {
  EnrollmentService
} from '../../services/enrollment';

import {
  Notification
} from '../../components/notification/notification';

@Component({
  selector: 'app-student-profile',
  imports: [
    Notification
  ],
  templateUrl: './student-profile.html',
  styleUrl: './student-profile.css'
})
export class StudentProfile
  implements OnInit {

  enrolledCourses: Course[] = [];

  isLoading = true;

  errorMessage = '';

  constructor(
    private enrollmentService:
    EnrollmentService
  ) {
  }

  ngOnInit(): void {
    this.enrollmentService
      .getEnrolledCourses()
      .subscribe({
        next: courses => {
          this.enrolledCourses =
            courses;
        },

        error: error => {
          this.errorMessage =
            error.message;

          this.isLoading = false;
        },

        complete: () => {
          this.isLoading = false;
        }
      });
  }
}
