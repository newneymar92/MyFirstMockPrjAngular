import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Account } from '../Student';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl =
    'https://66574f3d9f970b3b36c8c985.mockapi.io/taina18/students';

  constructor(private http: HttpClient) {}

  checkExistAccount(account: {
    username: string;
    password: string;
  }): Observable<boolean> {
    return this.http.get<Account[]>(`${this.apiUrl}/listAccounts`).pipe(
      map(
        (num: Account[]) =>
          num.filter((item) => {
            return (
              item.username === account.username &&
              item.password === account.password
            );
          }).length === 1
      )
    );
  }

  createAccount(account: Account): Observable<Account> {
    return this.http.post<Account>(`${this.apiUrl}/listAccounts`, account);
  }

  checkLoggedIn(): boolean {
    const result = localStorage.getItem('login') === 'true';
    console.log({ result });
    return result;
  }

  login() {
    localStorage.setItem('login', 'true');
  }

  logout() {
    localStorage.removeItem('login');
  }
}
