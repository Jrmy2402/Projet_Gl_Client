import { Component, ViewChild, AfterViewInit, NgZone } from '@angular/core';
import { NavbarAdminService } from './navbar-admin/navbar-admin.service';
import { MdSidenav } from '@angular/material';
// import { NavbarAdminService } from './navbar-admin/navbar-admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements AfterViewInit  {

  @ViewChild('sidenav') sidenav: MdSidenav;
  private menuMode;

  constructor(public navbarAdminService: NavbarAdminService, private _zone: NgZone) {
  }

  ngAfterViewInit() {
    this.navbarAdminService.sidenav = this.sidenav;
    window.onresize = (e) => {
      this.checkMenu();
    };
    this.checkMenu();
  }

  toggle() {
    this.navbarAdminService.toggle();
  }

  checkMenu() {
    this._zone.run(() => {
      const w = window.innerWidth;
      console.log(window, document.body.clientWidth);
      if (w > 1000) {
        this.navbarAdminService.open();
        // this.sidenav.mode('over');
        this.menuMode = 'side';
      } else {
        this.menuMode = 'over';
        this.navbarAdminService.close();
      }
    });
  }

}

