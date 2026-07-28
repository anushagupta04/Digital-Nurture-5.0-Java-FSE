import { inject } from '@angular/core';

import {
  HttpInterceptorFn
} from '@angular/common/http';

import {
  finalize
} from 'rxjs';

import {
  LoadingService
} from '../services/loading';

export const loadingInterceptor:
  HttpInterceptorFn =
  (request, next) => {

    const loadingService =
      inject(LoadingService);

    loadingService.show();

    return next(request).pipe(
      /*
       * finalize executes whether the request
       * succeeds or fails.
       */
      finalize(() => {
        loadingService.hide();
      })
    );
  };
