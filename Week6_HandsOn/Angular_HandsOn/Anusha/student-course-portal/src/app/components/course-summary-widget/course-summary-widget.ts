import {
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';

import {
  Subscription
} from 'rxjs';

import {
  CourseService
} from '../../services/course';

@Component({
  selector: 'app-course-summary-widget',
  imports: [],
  templateUrl: './course-summary-widget.html',
  styleUrl: './course-summary-widget.css'
})
export class CourseSummaryWidget
  implements OnInit, OnDestroy {

  totalCourses = 0;

  isLoading = true;

  errorMessage = '';

  private courseSubscription?: Subscription;

  constructor(
    private courseService: CourseService
  ) {
  }

  ngOnInit(): void {
    this.loadCourseCount();
  }

  loadCourseCount(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.courseSubscription =
      this.courseService
        .getCourses()
        .subscribe({
          next: courses => {
            this.totalCourses =
              courses.length;
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

  addSampleCourse(): void {
    const sampleCourse = {
      name: 'Artificial Intelligence',
      code: `AI${Date.now()}`,
      credits: 4,
      gradeStatus:
        'pending' as const
    };

    this.courseService
      .createCourse(sampleCourse)
      .subscribe({
        next: () => {
          this.loadCourseCount();
        },

        error: error => {
          this.errorMessage =
            error.message;
        }
      });
  }

  ngOnDestroy(): void {
    this.courseSubscription
      ?.unsubscribe();
  }
}
