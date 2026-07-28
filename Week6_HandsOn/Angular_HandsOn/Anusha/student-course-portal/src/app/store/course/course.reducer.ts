import {
  createReducer,
  on
} from '@ngrx/store';

import {
  Course
} from '../../models/course.model';

import {
  loadCourses,
  loadCoursesFailure,
  loadCoursesSuccess
} from './course.actions';

export const courseFeatureKey =
  'course';

export interface CourseState {
  courses: Course[];
  loading: boolean;
  error: string | null;
}

export const initialCourseState:
  CourseState = {

  courses: [],

  loading: false,

  error: null
};

export const courseReducer =
  createReducer(
    initialCourseState,

    on(
      loadCourses,
      state => ({
        ...state,
        loading: true,
        error: null
      })
    ),

    on(
      loadCoursesSuccess,
      (
        state,
        { courses }
      ) => ({
        ...state,
        courses: courses,
        loading: false,
        error: null
      })
    ),

    on(
      loadCoursesFailure,
      (
        state,
        { error }
      ) => ({
        ...state,
        courses: [],
        loading: false,
        error: error
      })
    )
  );
