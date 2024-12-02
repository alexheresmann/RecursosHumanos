import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RankingRepuestosComponent } from './ranking-repuestos.component';


describe('RankingRepuestosComponent', () => {
  let component: RankingRepuestosComponent;
  let fixture: ComponentFixture<RankingRepuestosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RankingRepuestosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RankingRepuestosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


});

