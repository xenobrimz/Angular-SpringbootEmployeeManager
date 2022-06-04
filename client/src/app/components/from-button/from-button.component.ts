import { Component, OnInit } from '@angular/core';
import { NbWindowService } from '@nebular/theme';
import { EmployeeFormComponent } from '../employee-form/employee-form.component';

@Component({
  selector: 'app-from-button',
  template: `

  `,
  styles: [
  ]
})
export class FromButtonComponent implements OnInit {


  constructor(private windowService: NbWindowService) { }

  ngOnInit(): void {
  }

  openWindow(){


  }

}
