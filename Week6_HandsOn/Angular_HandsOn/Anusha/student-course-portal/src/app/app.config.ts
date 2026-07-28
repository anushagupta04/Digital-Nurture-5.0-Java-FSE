import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection
} from '@angular/core';

import {
  provideRouter
} from '@angular/router';

import {
  provideHttpClient
} from '@angular/common/http';

import {
  provideStore
} from '@ngrx/store';

import {
  provideEffects
} from '@ngrx/effects';

import {
  provideStoreDevtools
} from '@ngrx/store-devtools';

import {
  routes
} from './app.routes';

import {
  courseFeatureKey,
  courseReducer
} from './store/course/course.reducer';

import {
  CourseEffects
} from './store/course/course.effects';

export const appConfig:
  ApplicationConfig = {

  providers: [
    provideBrowserGlobalErrorListeners(),

    provideZoneChangeDetection({
      eventCoalescing: true
    }),

    provideRouter(routes),

    provideHttpClient(),

    provideStore({
      [courseFeatureKey]:
      courseReducer
    }),

    provideEffects(
      CourseEffects
    ),

    provideStoreDevtools({
      maxAge: 25
    })
  ]
};
