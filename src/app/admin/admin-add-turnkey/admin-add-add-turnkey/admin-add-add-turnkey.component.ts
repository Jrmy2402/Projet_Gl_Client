import {
  Component,
  OnInit
} from '@angular/core';

import {
  VmService
} from '../../../shared/vm/vm.service';

@Component({
  selector: 'app-admin-add-add-turnkey',
  templateUrl: './admin-add-add-turnkey.component.html',
  styleUrls: ['./admin-add-add-turnkey.component.scss']
})

export class AdminAddAddTurnkeyComponent implements OnInit {

  constructor(private vmService: VmService) {}

  distribution: string;
  info: string;
  application: [string];

  ngOnInit() {

  }

  postTurnkey(distribution: string, info: string, application: string) {
    this.vmService.postTurnkey(this.distribution, this.info, this.application).subscribe(data => {
      console.log(data);
    }, err => console.log(err));
  }
}
