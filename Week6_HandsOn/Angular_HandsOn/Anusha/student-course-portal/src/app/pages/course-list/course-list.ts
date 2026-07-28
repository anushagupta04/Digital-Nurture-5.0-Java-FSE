import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';

import {
  FormsModule
} from '@angular/forms';

import {
  ActivatedRoute,
  Router
} from '@angular/router';

import {
  Store
} from '@ngrx/store';

import {
  Subject,
  Subscription,
  switchMap
} from 'rxjs';

import {
  CourseCard
} from '../../components/course-card/course-card';

import {
  Course
} from '../../models/course.model';

import {
  Student
} from '../../models/student.model';

import {
  CourseService
} from '../../services/course';

import {
  EnrollmentService
} from '../../services/enrollment';

import {
  loadCourses
} from '../../store/course/course.actions';

import {
  selectAllCourses,
  selectCoursesError,
  selectCoursesLoading
} from '../../store/course/course.selectors';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [
    FormsModule,
    CourseCard
  ],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css'
})
export class CourseList
  implements OnInit, OnDestroy {

  courses: Course[] = [];

  filteredCourses: Course[] = [];

  enrolledStudents: Student[] = [];

  searchTerm = '';

  isLoading = true;

  errorMessage = '';

  selectedCourseId:
    number | string | null = null;

  private selectedCourseSubject =
    new Subject<number | string>();

  private subscriptions =
    new Subscription();

  constructor(
    private courseService: CourseService,
    private enrollmentService:
    EnrollmentService,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.searchTerm =
      this.route.snapshot
        .queryParamMap
        .get('search') ?? '';

    this.subscribeToCourseStore();

    this.store.dispatch(
      loadCourses()
    );

    const studentSubscription =
      this.selectedCourseSubject
        .pipe(
          switchMap(courseId =>
            this.enrollmentService
              .getStudentsByCourse(courseId)
          )
        )
        .subscribe({
          next: students => {
            this.enrolledStudents =
              students;

            this.cdr.detectChanges();
          },

          error: error => {
            this.errorMessage =
              error?.message ??
              'Unable to load enrolled students.';

            this.cdr.detectChanges();
          }
        });

    this.subscriptions.add(
      studentSubscription
    );
  }

  private subscribeToCourseStore(): void {
    const coursesSubscription =
      this.store
        .select(selectAllCourses)
        .subscribe(courses => {
          this.courses = courses;

          this.filterCourses();

          this.cdr.detectChanges();
        });

    const loadingSubscription =
      this.store
        .select(selectCoursesLoading)
        .subscribe(loading => {
          this.isLoading = loading;

          this.cdr.detectChanges();
        });

    const errorSubscription =
      this.store
        .select(selectCoursesError)
        .subscribe(error => {
          this.errorMessage =
            error ?? '';

          this.cdr.detectChanges();
        });

    this.subscriptions.add(
      coursesSubscription
    );

    this.subscriptions.add(
      loadingSubscription
    );

    this.subscriptions.add(
      errorSubscription
    );
  }

  loadCourses(): void {
    this.store.dispatch(
      loadCourses()
    );
  }

  searchCourses(): void {
    const cleanedSearch =
      this.searchTerm.trim();

    this.router.navigate(
      ['/courses'],
      {
        queryParams: {
          search:
            cleanedSearch || null
        }
      }
    );

    this.filterCourses();

    this.cdr.detectChanges();
  }

  clearSearch(): void {
    this.searchTerm = '';

    this.router.navigate(
      ['/courses'],
      {
        queryParams: {
          search: null
        }
      }
    );

    this.filterCourses();

    this.cdr.detectChanges();
  }

  private filterCourses(): void {
    const search =
      this.searchTerm
        .trim()
        .toLowerCase();

    if (!search) {
      this.filteredCourses = [
        ...this.courses
      ];

      return;
    }

    this.filteredCourses =
      this.courses.filter(course =>
        course.name
          .toLowerCase()
          .includes(search) ||

        course.code
          .toLowerCase()
          .includes(search)
      );
  }

  openCourse(
    courseId: number | string
  ): void {
    this.router.navigate([
      '/courses',
      courseId
    ]);
  }

  onEnroll(
    courseId: number | string
  ): void {
    this.selectedCourseId =
      courseId;

    this.selectedCourseSubject.next(
      courseId
    );
  }

  deleteCourse(
    courseId: number | string,
    event: Event
  ): void {
    event.stopPropagation();

    const confirmed =
      window.confirm(
        'Delete this course?'
      );

    if (!confirmed) {
      return;
    }

    const deleteSubscription =
      this.courseService
        .deleteCourse(courseId)
        .subscribe({
          next: () => {
            this.store.dispatch(
              loadCourses()
            );
          },

          error: error => {
            this.errorMessage =
              error?.message ??
              'Unable to delete course.';

            this.cdr.detectChanges();
          }
        });

    this.subscriptions.add(
      deleteSubscription
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();

    this.selectedCourseSubject.complete();
  }
}
