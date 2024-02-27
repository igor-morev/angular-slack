import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MessageEditorComponent } from './message-editor.component';

describe('MessageEditorComponent', () => {
  let component: MessageEditorComponent;
  let fixture: ComponentFixture<MessageEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessageEditorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MessageEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
