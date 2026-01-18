import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { retry, catchError, throwError, timer } from 'rxjs';
import { retryWhen, delayWhen, take, concatMap } from 'rxjs/operators';

export const retryInterceptor: HttpInterceptorFn = (req, next) => {
  const maxRetries = 2;
  const retryDelay = 1000;

  return next(req).pipe(
    retryWhen((errors) => {
      return errors.pipe(
        concatMap((error: HttpErrorResponse, index: number) => {
          if (index < maxRetries && [403, 429, 500, 502, 503, 504].includes(error.status)) {
            return timer(retryDelay * (index + 1));
          }
          return throwError(() => error);
        }),
        take(maxRetries + 1)
      );
    }),
    catchError((error: HttpErrorResponse) => throwError(() => error))
  );
};
