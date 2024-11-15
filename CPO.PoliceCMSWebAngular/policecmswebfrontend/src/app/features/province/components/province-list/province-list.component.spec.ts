import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvinceListComponent } from './province-list.component';

describe('ProvinceListComponent', () => {
  let component: ProvinceListComponent;
  let fixture: ComponentFixture<ProvinceListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProvinceListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProvinceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
