import { Component, OnInit } from '@angular/core';
import {AdminService} from '../../service/admin.service';
import {Maintenance} from '../../../model/maintenance';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.css']
})
export class MaintenanceComponent implements OnInit {

  maintenance: Maintenance = null;

  constructor(private service: AdminService,
              private translate: TranslateService) { }

  ngOnInit() {
    this.initMaintenanceStatus();
  }

  initMaintenanceStatus() {
    this.service.getMaintenanceStatus().subscribe(data => {
      this.maintenance = data;
    }, err => console.log(err));
  }

  onPutInMaintenance() {
    let reason = "Testing purpose..";
    this.service.putInMaintenance(reason).subscribe(data => {
      this.maintenance = data;
    }, err => console.log(err));
  }

  onRemoveMaintenance() {
    this.service.removeMaintenance().subscribe(data => {
      this.maintenance = data;
    }, err => console.log(err));
  }

}
