import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent  implements OnInit {
  @Input() color = ' border-blue-400 '
  @Input() size = ' w-32 h-32'

  constructor() { }

  ngOnInit() {}

}
