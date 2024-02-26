import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ThreadChatViewComponent } from './thread-chat-view.component';

describe('ThreadChatViewComponent', () => {
  let component: ThreadChatViewComponent;
  let fixture: ComponentFixture<ThreadChatViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThreadChatViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ThreadChatViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
