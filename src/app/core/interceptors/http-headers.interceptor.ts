import { HttpInterceptorFn } from '@angular/common/http';

export const httpHeadersInterceptor: HttpInterceptorFn = (req, next) => {
  const clonedRequest = req.clone({
    setHeaders: {
      'Accept': 'application/json'
    }
  });

  return next(clonedRequest);
};
