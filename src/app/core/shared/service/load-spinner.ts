import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadSpinnerService {
  private loadingSubject = new BehaviorSubject(false);
  public  loading$ = this.loadingSubject.asObservable();


  show() {
    console.log("spinner show");
    this.loadingSubject.next(true);
  }

  hide() {
    console.log("spinner hide");
    this.loadingSubject.next(false);
  }
}
