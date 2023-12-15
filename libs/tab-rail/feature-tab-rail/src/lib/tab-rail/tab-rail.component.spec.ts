import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TabRailComponent } from './tab-rail.component';

describe('TabRailComponent', () => {
  let component: TabRailComponent;
  let fixture: ComponentFixture<TabRailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabRailComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TabRailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
