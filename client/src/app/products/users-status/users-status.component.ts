import { Component, OnInit } from '@angular/core';
import { UserStatus } from 'src/app/account/models/User';
import { AdminPanelService } from 'src/app/admin-panel.service';

@Component({
  selector: 'app-users-status',
  templateUrl: './users-status.component.html',
  styleUrls: ['./users-status.component.css'],
})
export class UsersStatusComponent implements OnInit {
  constructor(private adminService: AdminPanelService) {}
  users:UserStatus [] = [];

  ngOnInit(): void {
    this.adminService.getAllUsers().subscribe(
      (result) => {
        console.log(result);
        this.users = result;
      },
      (err) => console.log(err)
    );
  }
}
