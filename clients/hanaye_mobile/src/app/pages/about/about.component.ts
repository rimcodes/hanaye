import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent  implements OnInit {

  constructor(
    public platform: Platform
  ) { }

  ngOnInit() {}

}
