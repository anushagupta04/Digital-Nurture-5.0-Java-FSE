import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import {
  Observable,
  catchError,
  forkJoin,
  map,
  of,
  switchMap,
  throwError
} from 'rxjs';

import {
  Course
} from '../models/course.model';

import {
  Student
} from '../models/student.model';

export interface Enrollment {
  id: number | string;
  studentId: number | string;
  courseId: number | string;
}

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {

  private readonly enrollmentUrl =
    'http://localhost:3000/enrollments';

  private readonly studentUrl =
    'http://localhost:3000/students';

  private readonly courseUrl =
    'http://localhost:3000/courses';

  constructor(
    private http: HttpClient
  ) {
  }

  enroll(
    courseId: number | string
  ): Observable<Enrollment> {

    const enrollment:
      Omit<Enrollment, 'id'> = {
      studentId: 1,
      courseId
    };

    return this.http.post<Enrollment>(
      this.enrollmentUrl,
      enrollment
    );
  }

  unenroll(
    enrollmentId: number | string
  ): Observable<void> {

    return this.http.delete<void>(
      `${this.enrollmentUrl}/${enrollmentId}`
    );
  }

  getEnrollments():
    Observable<Enrollment[]> {

    return this.http.get<Enrollment[]>(
      this.enrollmentUrl
    );
  }

  getEnrolledCourses():
    Observable<Course[]> {

    return this.getEnrollments().pipe(
      map(enrollments =>
        enrollments.filter(
          enrollment =>
            String(enrollment.studentId) === '1'
        )
      ),

      switchMap(enrollments => {
        if (enrollments.length === 0) {
          return of([]);
        }

        const requests =
          enrollments.map(enrollment =>
            this.http.get<Course>(
              `${this.courseUrl}/${enrollment.courseId}`
            )
          );

        return forkJoin(requests);
      }),

      catchError(error => {
        console.error(error);

        return throwError(
          () =>
            new Error(
              'Failed to load enrolled courses.'
            )
        );
      })
    );
  }

  getStudentsByCourse(
    courseId: number | string
  ): Observable<Student[]> {

    return this.http
      .get<Enrollment[]>(
        `${this.enrollmentUrl}?courseId=${courseId}`
      )
      .pipe(
        switchMap(enrollments => {
          if (enrollments.length === 0) {
            return of([]);
          }

          const studentRequests =
            enrollments.map(enrollment =>
              this.http.get<Student>(
                `${this.studentUrl}/${enrollment.studentId}`
              )
            );

          return forkJoin(
            studentRequests
          );
        }),

        catchError(error => {
          console.error(error);

          return throwError(
            () =>
              new Error(
                'Failed to load enrolled students.'
              )
          );
        })
      );
  }
}
