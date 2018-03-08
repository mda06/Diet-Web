import { Component, OnInit } from '@angular/core';
import {AdminService} from '../../service/admin.service';
import {Maintenance} from '../../../model/maintenance';

@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.css']
})
export class MaintenanceComponent implements OnInit {

  maintenance: Maintenance = null;

  constructor(private service: AdminService) { }

  ngOnInit() {
    this.initMaintenanceStatus();
  }

  initMaintenanceStatus() {
    this.service.getMaintenanceStatus().subscribe(data => {
      this.maintenance = data;
    }, err => console.log(err));
  }

  onPutInMaintenance() {
    let reason = "Testing purposse..";
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
