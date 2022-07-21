import { Router } from '@angular/router';
import { Component } from '@angular/core';

import { ToastyConfig } from 'ng2-toasty';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  template = `<img src="http://pa1.narvii.com/5722/2c617cd9674417d272084884b61e4bb7dd5f0b15_hq.gif" />`;

  constructor(
    private toastyConfig: ToastyConfig,
    private router: Router
  ) {
    this.toastyConfig.theme = 'bootstrap';
  }

  exibindoNavbar() {
    return this.router.url !== '/login';
  }

}
