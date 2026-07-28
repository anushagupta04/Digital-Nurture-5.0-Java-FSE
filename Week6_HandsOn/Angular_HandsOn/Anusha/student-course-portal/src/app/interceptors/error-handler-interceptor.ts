import { inject } from '@angular/core';

import {
  HttpErrorResponse,
  HttpInterceptorFn
} from '@angular/common/http';

import {
  Router
} from '@angular/router';

import {
  catchError,
  throwError
} from 'rxjs';

export const errorHandlerInterceptor:
  HttpInterceptorFn =
  (request, next) => {

    const router =
      inject(Router);

    return next(request).pipe(
      catchError(
        (
          error: HttpErrorResponse
        ) => {

          if (error.status === 401) {
            console.error(
              'Unauthorised request.'
            );

            router.navigate(['/']);
          }

          if (error.status === 500) {
            window.alert(
              'A server error occurred.'
            );
          }

          return throwError(
            () => error
          );
        }
      )
    );
  };
