import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChannelChatViewComponent } from './channel-chat-view.component';

describe('ChannelChatViewComponent', () => {
  let component: ChannelChatViewComponent;
  let fixture: ComponentFixture<ChannelChatViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChannelChatViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChannelChatViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
