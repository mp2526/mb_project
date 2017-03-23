/**
 * Created by mike on 3/22/17.
 */
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AlertService, AuthService } from '../_services/index';

@Component({
  moduleId: module.id,
  templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
  model: any = {};
  loading = false;
  returnUrl: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private alertService: AlertService) { }

  ngOnInit() {
    this.authService.logout();

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login() {
    this.loading = true;
    this.authService.login(this.model.username, this.model.password)
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.alertService.error("Invalid username or password.");
          this.loading = false;
        });
  }
}
