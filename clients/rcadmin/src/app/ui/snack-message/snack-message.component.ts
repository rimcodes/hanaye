import { Component, OnInit, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snack-message',
  templateUrl: './snack-message.component.html',
  styleUrls: ['./snack-message.component.scss']
})
export class SnackMessageComponent implements OnInit {

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: SnackBarData ) { }

  ngOnInit(): void {

  }

}

export class SnackBarData {
  message!: string
  action!: string
  status!: string
}
