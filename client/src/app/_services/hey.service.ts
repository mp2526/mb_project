/**
 * Created by mike on 3/22/17.
 */
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

@Injectable()
export class HeyService {
  constructor(private http: Http) {
  }

  getHey() {
    return this.http.get('http://localhost:3002/hey', this.jwt()).map((response: Response) => response.json());
  }

  private jwt() {
    let user = JSON.parse(localStorage.getItem('loggedInUser'));
    if (user && user.token) {
      let headers = new Headers({'Authorization': 'Bearer ' + user.token});
      return new RequestOptions({headers: headers});
    }
  }
}
