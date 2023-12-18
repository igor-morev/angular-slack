import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PrimaryViewComponent } from './primary-view.component';

describe('PrimaryViewComponent', () => {
  let component: PrimaryViewComponent;
  let fixture: ComponentFixture<PrimaryViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrimaryViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PrimaryViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
