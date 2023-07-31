import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-workers',
  templateUrl: './workers.component.html',
  styleUrls: ['./workers.component.css']
})
export class WorkersComponent implements OnInit {
  workers$!: Observable<User[]>

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.workers$ = this.usersService.getWorkers()
  }
}
