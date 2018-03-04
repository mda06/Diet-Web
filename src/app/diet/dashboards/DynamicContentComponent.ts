import {Component, ComponentFactoryResolver, ComponentRef, Input, ViewChild, ViewContainerRef} from "@angular/core";

@Component({
  selector: 'dynamic-content',
  template: `
        <div>
            <div #container></div>
        </div>
    `
})
export class DynamicContentComponent {

  @ViewChild('container', { read: ViewContainerRef })
  container: ViewContainerRef;

  @Input()
  type: string;

  private componentRef: ComponentRef<{}>;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver) {
  }

  ngOnInit() {
    if (this.type) {
      console.log(this.getComponentType(this.type));
      let componentType = this.getComponentType(this.type);
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
    'sample1': DynamicSample1Component,
    'sample2': DynamicSample2Component
  };

  getComponentType(typeName: string) {
    let type = this.mappings[typeName];
    return type || UnknownDynamicComponent;
  }

}

@Component({
  selector: 'dynamic-sample-1',
  template: `<div>Dynamic sample 1</div>`
})
export class DynamicSample1Component {}

@Component({
  selector: 'dynamic-sample-2',
  template: `<div>Dynamic sample 2</div>`
})
export class DynamicSample2Component {}

@Component({
  selector: 'unknown-component',
  template: `<div>Unknown component</div>`
})
export class UnknownDynamicComponent {}
