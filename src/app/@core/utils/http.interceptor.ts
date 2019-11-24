import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable()
// Main Foucs of Interceptor to set global headers if any
// and Authenticate the API Call's
export class InterceptorService implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // To Access the Dev Server,
        // the token key hard coded for external
        var token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJBVVRPMDEiLCJlbWFpbF9JZCI6IkJBSkFKU3lzdGVtQHRlc3F1aXJlbC5jb20iLCJlbXBfQ29kZSI6IlN5c3RlbSIsIm9yZ19Db2RlIjoiQkFMSUMiLCJsYW5nX0NvZGUiOiJFIiwiZG9tYWluX0NvZGUiOiJJTlMiLCJzdWJkb21haW5fQ29kZSI6IkxJRkUiLCJ1c2VyX0lkIjoiQVVUTzAxIiwiZXhwIjoxNTc1Mjg4ODE0fQ.Sy64o-ZzdJIArseylAJDd77O5rBzJcW0o1I7aEa67KEZkDtbh7OOk6sQaklXru2CFgQOvrlldX4i0qnl48eziQ"; // auth is provided via constructor.
        // Set the Authorization Bearer Token to fetch the data to
        // external server.
        const authReq = req.clone({
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
                'Authorization': 'Bearer ' + token
            })
        });
        return next.handle(authReq);
    }
}