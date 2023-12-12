import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, firstValueFrom } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';
import { DeleteDialogueComponent } from 'src/app/ui/delete-dialogue/delete-dialogue.component';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css'],
})
export class ClientsComponent implements AfterViewInit {
  users$!: Observable<User[]>;
  users!: User[];
  displayedColumns: string[] = ['image', 'name', 'buttons', 'phone', 'address', 'created'];
  dataSource = new MatTableDataSource(this.users);

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private usersService: UsersService,
    private dialog: MatDialog
  ) {}

  @ViewChild(MatSort)
  sort!: MatSort;

  async ngAfterViewInit() {
    this.users = await firstValueFrom(this.usersService.getClients())
    this.dataSource = new MatTableDataSource(this.users);

    this.dataSource.sort = this.sort;
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  // constructor(private usersService: UsersService, private dialog: MatDialog) {}

  deleteUser(user: User) {
    const dialogRef = this.dialog.open(DeleteDialogueComponent, {
      width: '250px',
      data: { type: 'user', model: user, name: user.name },
    });

    dialogRef.afterClosed().subscribe((result) => {
      // user.id = result;
      this.users$ = this.usersService.getClients();
    });
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
