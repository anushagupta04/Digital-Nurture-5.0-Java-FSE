import {
  HttpInterceptorFn
} from '@angular/common/http';

export const authInterceptor:
  HttpInterceptorFn =
  (request, next) => {

    const authenticatedRequest =
      request.clone({
        setHeaders: {
          Authorization:
            'Bearer mock-token-12345'
        }
      });

    return next(
      authenticatedRequest
    );
  };
