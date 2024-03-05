import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ThreadsComponent } from './threads.component';

describe('ThreadsComponent', () => {
  let component: ThreadsComponent;
  let fixture: ComponentFixture<ThreadsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThreadsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ThreadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
