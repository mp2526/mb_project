/**
 * Created by mike on 3/22/17.
 */
import { Component, OnInit } from '@angular/core';

import { HeyService } from '../_services/index';

@Component({
  moduleId: module.id,
  templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {
  loggedInUser: null;
  hey: '';

  constructor(private heyService: HeyService) {
    this.loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
  }

  ngOnInit() {
    this.heyService.getHey().subscribe(message => { this.hey = message; });
  }
}
