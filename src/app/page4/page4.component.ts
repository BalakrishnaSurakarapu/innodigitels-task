import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { ParentComponent } from "../parent/parent.component";

@Component({
  selector: 'app-page4',
  standalone: true,
  imports: [CommonModule, ParentComponent],
  templateUrl: './page4.component.html',
  styleUrl: './page4.component.css'
})
export class Page4Component {
  formData: any;
  allData: any;
  displayedUsers: any[];

  constructor(private dataService: DataService) {
    this.allData = this.dataService.getFormData();
    this.displayedUsers = this.users.map(user => ({
      ...user,
      role: this.roles.find(role => role.id === user.roleId)?.role || 'Unknown',
    }));
  }

 
  users = [
    { id: 1, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', roleId: 1 },
    { id: 2, firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com', roleId: 1 },
    { id: 3, firstName: 'Michael', lastName: 'Johnson', email: 'michael.johnson@example.com', roleId: 2 },
    { id: 4, firstName: 'Emily', lastName: 'Brown', email: 'emily.brown@example.com', roleId: 1 },
    { id: 5, firstName: 'Sandy', lastName: 'Joe', email: 'sandy.brown@example.com', roleId: 2 },
  ];

  roles = [
    { id: 1, role: 'admin' },
    { id: 2, role: 'employee' },
  ];

 
}
