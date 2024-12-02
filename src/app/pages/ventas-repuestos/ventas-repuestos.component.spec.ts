import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentasRepuestosComponent } from './ventas-repuestos.component';

describe('VentasRepuestosComponent', () => {
  let component: VentasRepuestosComponent;
  let fixture: ComponentFixture<VentasRepuestosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VentasRepuestosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VentasRepuestosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
