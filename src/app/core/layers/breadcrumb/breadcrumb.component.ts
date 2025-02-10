import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent  implements OnInit  {
  bcLength = 0 ;
  constructor(private bc : BreadcrumbService){}

  ngOnInit(): void {
    this.bc.breadcrumbs$.subscribe(breadcrumb=>{
      this.bcLength = breadcrumb.length
    })
    
  }

}
