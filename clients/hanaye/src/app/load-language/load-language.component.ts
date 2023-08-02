import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { timer } from 'rxjs';

@Component({
  selector: 'app-load-language',
  templateUrl: './load-language.component.html',
  styleUrls: ['./load-language.component.scss'],
})
export class LoadLanguageComponent implements OnInit {
  constructor(private location: Location) // private authService: AuthService,
  {}

  ngOnInit() {
    timer(3000).subscribe((n) => {
      this.location.back()
    })
  }
}
