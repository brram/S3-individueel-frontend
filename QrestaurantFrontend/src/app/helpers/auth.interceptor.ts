import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
  HttpStatusCode
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { catchError, map, tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router, private toastr: ToastrService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${localStorage.getItem('JWT')}`
                }
            });

            return next.handle(request).pipe( tap(() => {},
            (err: any) => {
            if (err instanceof HttpErrorResponse) {
              if (err.status !== 401) {
               return;
              }
              this.router.navigate(['/login']);
              if(window.location.pathname != '/login'){
                  this.toastr["warning"]("Currently not logged in", "", {
                  timeOut: 2000,
                  closeButton: true,
                  progressBar: true,
                  positionClass: 'toast-bottom-right'
                });
              }
            }
          }));
        }
      }
