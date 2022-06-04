import { HttpErrorResponse } from '@angular/common/http';
import { Component, DoCheck, Input, IterableDiffers, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NbWindowRef, NbWindowService } from '@nebular/theme';
import { Long } from 'mongodb';
import { Employee } from 'src/app/models/employee';
import { EmployeeService } from 'src/app/services/employee.service';
import { EmployeeFormComponent } from '../employee-form/employee-form.component';


@Component({
  selector: 'app-employee-list',
  template: `
    <nb-card accent="primary" [nbSpinner]="loading"
             nbSpinnerStatus="danger"
             nbSpinnerSize="large"
             nbSpinnerMessage="">
      <nb-card-body>
        <table class="table table-bordered table-striped" *ngIf="employees[0] != null" ngOn>
          <thead class="thead-dark">
            <tr>
              <th scope="col"><h1>#</h1></th>
              <th scope="col"><h1>First Name</h1></th>
              <th scope="col"><h1>Last Name</h1></th>
              <th scope="col"><h1>Age</h1></th>
              <th scope="col"><h1>Role</h1></th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let employee of employees">
              <td><h1> {{employee._id}} </h1></td>
              <td><h1> {{employee.firstName}}</h1></td>
              <td><h1> {{employee.lastName}}</h1></td>
              <td><h1> {{employee.age}}</h1></td>
              <td><h1> {{employee.role}}</h1></td>
              <td><button nbButton hero status="danger" (click)="onDelete(employee._id)">Fire Employee</button></td>
            </tr>
          </tbody>
        </table>
        <h1  *ngIf=" employees[0] == null">Empty</h1>
      </nb-card-body>
      <nb-card-footer><button nbButton outline (click)="openWindow()">Add User</button></nb-card-footer>
    </nb-card>
  `,
  styleUrls: ['./employee-list.component.scss']
})

export class EmployeeListComponent implements OnInit, DoCheck{

  @Input() employees!: Employee[];

  currentEmpCount = 0;
  empDiffer: any;

  constructor(private employeeService: EmployeeService, private windowService: NbWindowService) {
  }

  ngOnInit() {
      this.getEmployees();
  }



  ngDoCheck(){
    if(this.employees.length != this.currentEmpCount){
      this.getEmployees();
    }
  }

  openWindow(){
    this.windowService.open(EmployeeFormComponent,{title:`Hire new Employee`} )
  }


  onDelete(id: Long){
    console.log('deleting:' + id)
    this.employeeService.delete(id).subscribe({
      next: data => {
          this.currentEmpCount--;
          console.log(data);
      },
      error: error => {
          console.error('There was an error!', error);
      }
    });

  }

  getEmployees(){
    this.employeeService.getEmployees().subscribe( res =>{

          /* Stringifies result because Observable<Employee[]>
          returns undefined when mapped and allows
          access directly to the body parameter.*/

          let emps = JSON.parse(JSON.stringify(res))
          this.employees = emps.map( (res: { body: any; }) =>{  console.log()
            return res.body
          });
          this.toggleLoadingAnimation();
          this.currentEmpCount = this.employees.length;
    }
    )

  }

  loading = false;

  toggleLoadingAnimation() {
    this.loading = true;
    setTimeout(() => this.loading = false, 500);
  }

}
