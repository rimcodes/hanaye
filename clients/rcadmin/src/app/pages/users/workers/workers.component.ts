import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';
import { DeleteDialogueComponent } from 'src/app/ui/delete-dialogue/delete-dialogue.component';

@Component({
  selector: 'app-workers',
  templateUrl: './workers.component.html',
  styleUrls: ['./workers.component.css']
})
export class WorkersComponent implements OnInit {
  workers$!: Observable<User[]>

  constructor(private usersService: UsersService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.workers$ = this.usersService.getWorkers()
  }

  deleteUser(user: User) {
    const dialogRef = this.dialog.open(DeleteDialogueComponent, {
      width: '250px',
      data: { type: 'user', model: user, name: user.name },
    });

    dialogRef.afterClosed().subscribe((result) => {
      // user.id = result;
      this.workers$ = this.usersService.getClients()
    });
  }
}
