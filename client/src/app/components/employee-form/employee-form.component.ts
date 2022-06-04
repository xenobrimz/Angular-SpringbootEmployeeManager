import { Component, OnInit } from '@angular/core';
import { NgForm} from '@angular/forms';
import { NbWindowRef } from '@nebular/theme';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee-form',
  template: `
    <nb-card>
      <nb-card-body>
        <form #f="ngForm" (ngSubmit)="onSubmit(f)" novalidate>
          <div class="form-group">
            <label for="firstName">First Name</label>
            <input type="text" class="form-control" name="firstName" ngModel required #firstName="ngModel" id="firstName" placeholder="John">
          </div>
          <div class="form-group">
            <label for="lastName">Last Name</label>
            <input type="text" class="form-control" name="lastName" ngModel required #lastName="ngModel" id="lastName" placeholder="Doe">
          </div>
          <div class="form-group">
            <label for="age">Age</label>
            <input type="number" class="form-control" name="age" ngModel required #age="ngModel" id="age" placeholder="18">
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Role</label>
            <input type="text" class="form-control" name="role" ngModel required #role="ngModel" id="exampleInputPassword1">
          </div>
          <button type="submit" class="btn btn-primary" >Submit</button>
        </form>
      </nb-card-body>
    </nb-card>
  `,
  styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent implements OnInit {

  constructor(private employeeService: EmployeeService, protected windowRef: NbWindowRef<any>) {

  }

  ngOnInit(): void {

  }

  onSubmit(f: NgForm): void {
    console.log(f.value);
    console.log(f.valid);
    this.employeeService.save(f.value);
    this.windowRef.close();
    window.location.reload();
  }

}
