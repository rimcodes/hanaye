import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-update-app',
  templateUrl: './update-app.component.html',
  styleUrls: ['./update-app.component.scss'],
})
export class UpdateAppComponent  implements OnInit {


    constructor(public platform: Platform) {}

  ngOnInit() {}

}
