import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Store } from 'src/app/models/store.model';
import { StoresService } from 'src/app/services/stores.service';
import { DeleteDialogueComponent } from 'src/app/ui/delete-dialogue/delete-dialogue.component';

@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.scss'],
})
export class StoresComponent implements OnInit {
  stores$!: Observable<Store[]>;

  constructor(
    private storesService: StoresService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadStores();
  }

  loadStores() {
    this.stores$ = this.storesService.getAllStores();
  }

  deleteStore(store: Store) {
    const dialogRef = this.dialog.open(DeleteDialogueComponent, {
      width: '250px',
      data: { type: 'store', model: store, name: store.name },
    });

    dialogRef.afterClosed().subscribe((result) => {
      // user.id = result;
      this.loadStores();
    });
  }
}
