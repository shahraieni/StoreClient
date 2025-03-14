import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable()
export class ErrorHandlingInterceptor implements HttpInterceptor {

  constructor(private toast: ToastrService , private router : Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error :HttpErrorResponse)=>{
        if(error){
          const base = error.error

         switch (base.statusCode) {
          case 404:
            this.router.navigateByUrl('/notfount');
            this.toast.error(base?.message)
            break;
          case 404:
    
            this.toast.error(base?.message)
            break;
         
          default:
            break;
         }
        }

       return throwError(()=>{
        return error
       });

      })
    );
  }
}
