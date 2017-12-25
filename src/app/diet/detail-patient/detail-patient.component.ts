import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Patient} from "../../model/patient";
import {DetailReturn} from "./detail-return";

@Component({
  selector: 'app-detail-patient',
  templateUrl: './detail-patient.component.html',
  styleUrls: ['./detail-patient.component.css']
})
export class DetailPatientComponent implements OnInit {

  @Input() patient: Patient;
  @Output() detailReturn = new EventEmitter<DetailReturn>();
  public isAddressCollapsed = true;

  constructor(/*private route: ActivatedRoute,
              private dietService: DietService*/) { }

  ngOnInit() {
    /*if(isNullOrUndefined(this.patient)) {
      const id = +this.route.snapshot.paramMap.get('id');
      this.dietService.getPatient(id).subscribe(
        data => this.patient = data
      );
    }*/
  }

  goBack() {
    this.detailReturn.emit(DetailReturn.BACK);
  }

}
