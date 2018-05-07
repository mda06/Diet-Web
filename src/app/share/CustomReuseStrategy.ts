import {ActivatedRouteSnapshot, DetachedRouteHandle, RouteReuseStrategy} from '@angular/router';

export class CustomReuseStrategy implements RouteReuseStrategy {
  routesToCache: string[] = ["/admin/chat", "/diet/chat", "/patient/chat"];
  storedRouteHandles = new Map<string, DetachedRouteHandle>();

  private takeFullUrl(route: ActivatedRouteSnapshot): string {
    let next = route;
    // Since navigation is usually relative
    // we go down to find out the child to be shown.
    while (next.firstChild) {
      next = next.firstChild;
    }
    const segments = [];
    // Then build a unique key-path by going to the root.
    while (next) {
      segments.push(next.url.join('/'));
      next = next.parent;
    }
    return segments.reverse().join('/');
  }

  // Decides if the route should be stored
  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    return this.routesToCache.indexOf(this.takeFullUrl(route)) > -1;
  }

  //Store the information for the route we're destructing
  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
    this.storedRouteHandles.set(this.takeFullUrl(route), handle);
  }

//Return true if we have a stored route object for the next route
  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    //If we go to the login
    //Clear the cache
    if(route.routeConfig.path)
      this.storedRouteHandles.clear();
    return this.storedRouteHandles.has(this.takeFullUrl(route));
  }

  //If we returned true in shouldAttach(), now return the actual route data for restoration
  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
    return this.storedRouteHandles.get(this.takeFullUrl(route));
  }

  //Reuse the route if we're going to and from the same route
  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    return future.routeConfig === curr.routeConfig;
  }
}
