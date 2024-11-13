import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvinceViewComponent } from './province-view.component';

describe('ProvinceViewComponent', () => {
  let component: ProvinceViewComponent;
  let fixture: ComponentFixture<ProvinceViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProvinceViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProvinceViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
