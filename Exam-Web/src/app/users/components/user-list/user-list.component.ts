import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../models/user.model';
import { DeviceDetectorService } from 'ngx-device-detector';
import { MatDialog } from '@angular/material/dialog';
import { MessageComponent } from 'src/app/shared/components/message/message.component';
import { MessageData } from 'src/app/shared/models/message-data.model';
import { UsersService } from '../../users.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  providers: [DeviceDetectorService]
})
export class UserListComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private usersService: UsersService,
    private deviceService: DeviceDetectorService,
    private toaster: ToasterService,
    private dialog: MatDialog) { }

  users: User[] | undefined;
  colsNumber: number = 2;
  rowHeight: string = '2.4:1';

  ngOnInit(): void {
    this.users = this.route.snapshot.data['users'];
    this.colsNumber = this.deviceService.isMobile() ? 1 : 2;
    this.rowHeight = this.deviceService.isMobile() ? '1.5:1' : '2.4:1';
  }

  deleteUser(userId: string) {
    const messageData: MessageData = {
      matIcon: 'question_mark',
      message: 'Are you sure you want to delete this user?',
      yesButton: 'Yes',
      noButton: 'No'
    }
    this.dialog.open(MessageComponent, { disableClose: true, width: '300px', height: '320px', data: messageData }).afterClosed().subscribe({
      next: (result: boolean) => {
        if (result) {
          this.usersService.deleteUser(userId).subscribe({
            complete: () => {
              this.users = this.users?.filter(user => user.id !== userId);
              this.toaster.showToaster('User deleted');
            },
            error: () => this.toaster.showToaster('Error deleting user'),
          });
        }
      }
    });
  }

}
