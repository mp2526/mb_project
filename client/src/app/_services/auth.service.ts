/**
 * Created by mike on 3/22/17.
 */
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthService {
  constructor(private http: Http) { }

  login(username: string, password: string) {
    let body = JSON.stringify({ "username": username, "password": password });
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post('http://localhost:3002/auth', body, options)
      .map((response: Response) => {
        let user = response.json();
        if (user && user.token) {
          localStorage.setItem('loggedInUser', JSON.stringify(user));
        }
      });
  }

  logout() {
    localStorage.removeItem('loggedInUser');
  }
}
