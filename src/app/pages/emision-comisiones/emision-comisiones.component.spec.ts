import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmisionComisionesComponent } from './emision-comisiones.component';

describe('EmisionComisionesComponent', () => {
  let component: EmisionComisionesComponent;
  let fixture: ComponentFixture<EmisionComisionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmisionComisionesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmisionComisionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
