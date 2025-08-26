import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  private _showHeaderSideBar = new BehaviorSubject<boolean>(true);
  public showHeaderSidebar$ = this._showHeaderSideBar.asObservable();

  hideHeaderSidebar() {
    return this._showHeaderSideBar.next(false);
  }

  showHeaderSidebar() {
    return this._showHeaderSideBar.next(true);
  }
}
