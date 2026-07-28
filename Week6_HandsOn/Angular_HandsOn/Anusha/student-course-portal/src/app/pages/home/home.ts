import {
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';

import {
  FormsModule
} from '@angular/forms';

import {
  Subscription
} from 'rxjs';

import {
  CourseSummaryWidget
} from '../../components/course-summary-widget/course-summary-widget';

import {
  CourseService
} from '../../services/course';

@Component({
  selector: 'app-home',
  imports: [
    FormsModule,
    CourseSummaryWidget
  ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit, OnDestroy {

  portalName = 'Student Course Portal';

  isPortalActive = true;

  message = '';

  searchTerm = '';

  coursesAvailable = 0;

  isLoading = true;

  errorMessage = '';

  private courseSubscription?: Subscription;

  constructor(
    private courseService: CourseService
  ) {
  }

  ngOnInit(): void {
    this.loadCourseCount();

    console.log(
      'Home component initialised'
    );
  }

  loadCourseCount(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.courseSubscription =
      this.courseService
        .getCourses()
        .subscribe({
          next: courses => {
            this.coursesAvailable =
              courses.length;
          },

          error: error => {
            this.errorMessage =
              error.message;

            this.isLoading = false;

            console.error(
              'Failed to load course count:',
              error
            );
          },

          complete: () => {
            this.isLoading = false;
          }
        });
  }

  onEnrollClick(): void {
    this.message =
      'Enrollment opened!';
  }

  ngOnDestroy(): void {
    this.courseSubscription
      ?.unsubscribe();

    console.log(
      'Home component destroyed'
    );
  }
}
