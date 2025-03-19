import { Injectable } from '@angular/core';
import {
   HttpInterceptor,
   HttpRequest,
   HttpHandler,
   HttpEvent
} from '@angular/common/http';

import { catchError, tap } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AppService } from '../services/app.service'; 

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

   constructor(private dialog: MatDialog, private appService: AppService,private router: Router
   ) { }
   
   intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      const token = window.localStorage.getItem('token');
      request = request.clone({
         setHeaders: {
            'Authorization': `Bearer ${token}`,
         },
      });

      return next.handle(request)
         .pipe(
            tap(
               _response => {
                  status = '';
               },
               _error => (status = 'failed')
            )
         )
         .pipe(
            catchError((error: any, _caught: Observable<HttpEvent<any>>) => {
               console.log(error);
               if (error.status === 401) {
                  this.handleAuthError(error);
                  return of(error);
               }
               if (error.status === 403) {
                  this.handleAuthErrorApps(error);
                  return of(error);
               }
               return throwError(error);
            })
         );
   }

   handleAuthErrorApps(_error: any) {
    //   this.alert.show('You are not authorised to perform this action.');
    this.appService.openSnackBar('Session Expired', 'OK')
      localStorage.clear();
   }
   handleAuthError(_error: any) {
    //   this.alert.show('You are not authorised to perform this action.');
      this.appService.openSnackBar('Session Expired', 'OK')
      localStorage.clear();
   }
}
