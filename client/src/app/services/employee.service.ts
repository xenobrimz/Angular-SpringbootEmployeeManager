import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Long } from 'mongodb';

import { catchError, Observable, retry, throwError } from 'rxjs';
import { Employee } from '../models/employee';


@Injectable({
  providedIn: 'root'
})

export class EmployeeService {

  private employeesUrl: string;

  constructor(private http: HttpClient) {
    this.employeesUrl = 'http://localhost:8080/employees/';
  }

  public getEmployees(): Observable<Employee[]> {
    return this.http
      .get<Employee[]>(this.employeesUrl)
      .pipe(retry(1), catchError(this.handleError))
  }

  public save(employee: Employee) {
    return this.http
      .post<Employee>(this.employeesUrl, employee)
      .subscribe({
        next:(res) => console.log(res),
        error:(err) => console.log(err)
    });
  }

  public delete(id: Long) {
    console.log(this.employeesUrl + id)
    return this.http.delete(this.employeesUrl + id)

  }

  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}
