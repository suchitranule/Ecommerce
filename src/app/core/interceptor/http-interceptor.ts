import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, finalize, Observable, throwError } from 'rxjs';
import { LoadSpinnerService } from '../shared/service/load-spinner';

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
  constructor(private router: Router, public loadSpinnerService:LoadSpinnerService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    this.loadSpinnerService.show();
    // const requestWithCookies = req.clone({ // http-only cookie since public API (dummyJSON) is not supporting Https-only using sessionStorage
    //   withCredentials: true
    // });

    const token = sessionStorage.getItem('token');

    let cloned = req;
    if (token) {
      cloned = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      });
    }

    return next.handle(cloned).pipe(
      catchError((error:HttpErrorResponse) => {
        if(error.status == 401) {
          console.warn("UnAuthorised");
        } else {
          console.log("Http Error:", error); 
        }
        return throwError(()=>error)
      }),
      finalize(() => {
        this.loadSpinnerService.hide();
      })
    )
  }
}

