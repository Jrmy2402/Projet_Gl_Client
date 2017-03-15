import { Injectable, ViewChild } from '@angular/core';
import { MdSidenav } from '@angular/material';

@Injectable()
export class NavbarAdminService {

  public sidenav: any;

  constructor() {

  }

  toggle() {
    this.sidenav.toggle();
  }

  open() {
    this.sidenav.open();
  }

  mode(mode: string) {
    this.sidenav.mode(mode);
  }

  close() {
    this.sidenav.close();
  }

}
