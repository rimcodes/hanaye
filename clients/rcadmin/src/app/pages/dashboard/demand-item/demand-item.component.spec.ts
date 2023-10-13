import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandItemComponent } from './demand-item.component';

describe('DemandItemComponent', () => {
  let component: DemandItemComponent;
  let fixture: ComponentFixture<DemandItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DemandItemComponent]
    });
    fixture = TestBed.createComponent(DemandItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
