import {
  Component, ComponentFactoryResolver, ComponentRef, HostBinding, Input, OnInit, ViewChild,
  ViewContainerRef
} from '@angular/core';
import {IDashboardItem} from '../../model/dashboardItem';
import {FoodInfoComponent} from "../../diet/dashboards/food-info/food-info.component";
import {PatientInfoComponent} from "../../diet/dashboards/patient-info/patient-info.component";
import {FoodSliderComponent} from "../../diet/dashboards/food-slider/food-slider.component";

@Component({
  selector: 'app-dashboard-item',
  templateUrl: './dashboard-item.component.html',
  styleUrls: ['./dashboard-item.component.css']
})
export class DashboardItemComponent implements OnInit {

  @Input() model: IDashboardItem;
  @HostBinding('style.grid-row-start') rowStart: number = 1;
  @HostBinding('style.grid-row-end') rowEnd: number = 3;
  @HostBinding('style.grid-column-start') colStart: number = 2;
  @HostBinding('style.grid-column-end') colEnd: number = 4;
  title: string = "Not set";

  @ViewChild('container', { read: ViewContainerRef })
  container: ViewContainerRef;

  private componentRef: ComponentRef<{}>;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver) {
  }

  ngOnInit() {
    if (this.model) {
      this.rowStart = this.model.rowStart;
      this.rowEnd = this.model.rowEnd;
      this.colStart = this.model.colStart;
      this.colEnd = this.model.colEnd;
      this.title = this.model.title;
      let componentType = this.model.component;
      let factory = this.componentFactoryResolver.resolveComponentFactory(componentType);
      this.componentRef = this.container.createComponent(factory);
    }
  }

  ngOnDestroy() {
    if (this.componentRef) {
      this.componentRef.destroy();
      this.componentRef = null;
    }
  }

  private mappings = {
    1: FoodInfoComponent,
    2: PatientInfoComponent,
    3: FoodSliderComponent
  };

  getComponentType(id: number) {
    let type = this.mappings[id];
    return type;
  }
}
