import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './nav/nav.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { SnackMessageComponent } from './snack-message/snack-message.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DeleteDialogueComponent } from './delete-dialogue/delete-dialogue.component';
import { MatDialogModule } from '@angular/material/dialog';



@NgModule({
  declarations: [
    NavComponent,
    FooterComponent,
    SnackMessageComponent,
    DeleteDialogueComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatSnackBarModule,
    MatDialogModule,
  ],
  exports: [
    SnackMessageComponent,
    NavComponent,
    DeleteDialogueComponent
  ]
})
export class UiModule { }
