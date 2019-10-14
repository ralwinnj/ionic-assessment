import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';

import * as model from '../models/models';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  // tslint:disable-next-line: max-line-length
  public loginUrl = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyAR4Yezxk7Ao4qeFntu7tIvE7pH28Eh64Y';
  public apiClientUrl = 'https://momentum-retail-practical-test.firebaseio.com/clients/';
  // tslint:disable-next-line: max-line-length
  public apiAccountsUrl = 'https://momentum-retail-practical-test.firebaseio.com/accounts/';
  public localId: string;
  public idToken: string;
  constructor(private http: HttpClient) { }

  login(body: model.ILogin) {
    return this.http.post(this.loginUrl, body, httpOptions)
      .pipe(
        tap(user => console.log(user)),
        catchError(this.handleError('login', []))
      );
  }

  getAccounts(localId, idToken) {
    const url = `${this.apiClientUrl}${localId}.json?auth=${idToken}`;
    return this.http.get(url, httpOptions)
      .pipe(
        tap(user => console.log(user)),
        catchError(this.handleError('getAccounts', []))
      );
  }

  getAccount(accountNumber, idToken) {
    const url = `${this.apiAccountsUrl}${accountNumber}.json?auth=${idToken}`;
    return this.http.get(url, httpOptions)
      .pipe(
        tap(user => console.log(user)),
        catchError(this.handleError('getAccount', []))
      );
  }

  updateAccount(accountNumber: model.IAccount, body, idToken) {
    const url = `${this.apiAccountsUrl}${accountNumber}.json?auth=${idToken}`;
    return this.http.put(url, body, httpOptions)
      .pipe(
        tap(user => console.log(user)),
        catchError(this.handleError('updateAccount', []))
      );
  }
  addAccount(accountNumber, body: model.IAccount, idToken) {
    const url = `${this.apiAccountsUrl}${accountNumber}.json?auth=${idToken}`;
    return this.http.post(url, body, httpOptions)
      .pipe(
        tap(user => console.log(user)),
        catchError(this.handleError('addAccount', []))
      );
  }




  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      return of(result as T);
    };
  }
}
