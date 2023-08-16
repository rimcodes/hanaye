import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';
import { DeleteDialogueComponent } from 'src/app/ui/delete-dialogue/delete-dialogue.component';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  users$!: Observable<User[]>

  constructor(private usersService: UsersService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.users$ = this.usersService.getClients()
  }

  deleteUser(user: User) {
    const dialogRef = this.dialog.open(DeleteDialogueComponent, {
      width: '250px',
      data: { type: 'user', model: user, name: user.name },
    });

    dialogRef.afterClosed().subscribe((result) => {
      // user.id = result;
      this.users$ = this.usersService.getClients()
    });
  }

}
