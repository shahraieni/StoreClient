import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BusyService {
  private busyRequestCount =  new BehaviorSubject<number>(0);
  constructor(private spinnerService:NgxSpinnerService) { }

  show(){
    this.busyRequestCount.next(this.busyRequestCount.value +1);
    this.spinnerService.show(undefined,{
      bdColor: 'rgba(0, 0, 0, 0.8)',
      size: 'medium',
      color: '#2262c1',
      type:'ball-running-dots',
    })

  }

  hide(){
    this.busyRequestCount.next(this.busyRequestCount.value - 1)
    if(this.busyRequestCount.value <= 0){
      this.busyRequestCount.next(0);
      this.spinnerService.hide();
    }
  }
}
