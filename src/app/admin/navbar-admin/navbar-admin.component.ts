import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NavbarAdminService } from './navbar-admin.service';

@Component({
  selector: 'app-navbar-admin',
  templateUrl: './navbar-admin.component.html',
  styleUrls: ['./navbar-admin.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NavbarAdminComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
}
