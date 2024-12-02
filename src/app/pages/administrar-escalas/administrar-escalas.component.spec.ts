import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrarEscalasComponent } from './administrar-escalas.component';

describe('AdministrarEscalasComponent', () => {
  let component: AdministrarEscalasComponent;
  let fixture: ComponentFixture<AdministrarEscalasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdministrarEscalasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdministrarEscalasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
