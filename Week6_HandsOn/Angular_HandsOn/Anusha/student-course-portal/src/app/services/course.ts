import { Injectable } from '@angular/core';

import {
  HttpClient,
  HttpErrorResponse
} from '@angular/common/http';

import {
  Observable,
  catchError,
  map,
  retry,
  tap,
  throwError
} from 'rxjs';

import { Course } from '../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private readonly apiUrl =
    'http://localhost:3000/courses';

  constructor(
    private http: HttpClient
  ) {
  }

  getCourses(): Observable<Course[]> {
    return this.http
      .get<Course[]>(this.apiUrl)
      .pipe(
        /*
         * map transforms the stream's data.
         * Courses with zero credits are removed.
         */
        map(courses =>
          courses.filter(
            course => course.credits > 0
          )
        ),

        /*
         * tap is used for side effects such as logging.
         * It does not transform the returned data.
         */
        tap(courses =>
          console.log(
            'Courses loaded:',
            courses.length
          )
        ),

        /*
         * Retry a failed request two times before
         * sending the error to catchError.
         */
        retry(2),

        catchError(error =>
          this.handleError(error)
        )
      );
  }

  getCourseById(
    id: number | string
  ): Observable<Course> {

    return this.http
      .get<Course>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(error =>
          this.handleError(error)
        )
      );
  }

  createCourse(
    course: Omit<Course, 'id'>
  ): Observable<Course> {

    return this.http
      .post<Course>(
        this.apiUrl,
        course
      )
      .pipe(
        tap(createdCourse =>
          console.log(
            'Course created:',
            createdCourse
          )
        ),

        catchError(error =>
          this.handleError(error)
        )
      );
  }

  updateCourse(
    id: number | string,
    course: Course
  ): Observable<Course> {

    return this.http
      .put<Course>(
        `${this.apiUrl}/${id}`,
        course
      )
      .pipe(
        tap(updatedCourse =>
          console.log(
            'Course updated:',
            updatedCourse
          )
        ),

        catchError(error =>
          this.handleError(error)
        )
      );
  }

  deleteCourse(
    id: number | string
  ): Observable<void> {

    return this.http
      .delete<void>(
        `${this.apiUrl}/${id}`
      )
      .pipe(
        tap(() =>
          console.log(
            `Course ${id} deleted`
          )
        ),

        catchError(error =>
          this.handleError(error)
        )
      );
  }

  private handleError(
    error: HttpErrorResponse
  ): Observable<never> {

    console.error(
      'Course API error:',
      error
    );

    return throwError(
      () =>
        new Error(
          'Failed to load courses. Please try again.'
        )
    );
  }
}
