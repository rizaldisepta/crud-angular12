import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  Observable, throwError,of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Model } from './model';
import * as modelData from './model.json';

@Injectable({
  providedIn: 'root'
})
export class ModelService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  private apiURL = "http://localhost:3000";
  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<any> {
    return this.httpClient.get( this.apiURL+'/users')

    .pipe(
      catchError(this.errorHandler)
    )
  }
     
  create(post:Model): Observable<any> {

    return this.httpClient.post(this.apiURL+'/users', JSON.stringify(post), this.httpOptions)
  }  
     
  find(id:number): Observable<any> {

    return this.httpClient.get( this.apiURL+'/users/' + id)

    .pipe(
      catchError(this.errorHandler)
    )
  }
     
  update(id:number, post:Model): Observable<any> {

    return this.httpClient.put( this.apiURL+'/users/' + id, JSON.stringify(post), this.httpOptions)

    .pipe(
      catchError(this.errorHandler)
    )
  }
     
  delete(id:number){
    return this.httpClient.delete(this.apiURL+ '/users/' + id, this.httpOptions)

    .pipe(
      catchError(this.errorHandler)
    )
  }
  filterByAll(title: any): Observable<any> {
    return this.httpClient.get(`${this.apiURL +'/users/'}?nama_like=${title}`).pipe(
     
    );
  }
  errorHandler(error:any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
 }
}
