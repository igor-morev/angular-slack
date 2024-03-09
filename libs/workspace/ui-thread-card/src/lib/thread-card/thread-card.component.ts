import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Message, Thread } from '@angular-slack/slack-api';
import { ChatMessageComponent } from '@angular-slack/chat-message';
import { MessageEditorComponent } from '@angular-slack/message-editor';
import { CollectionCommasPipe } from '@angular-slack/pipes/collection-commas';

@Component({
  selector: 'as-thread-card',
  standalone: true,
  imports: [
    CommonModule,
    ChatMessageComponent,
    MessageEditorComponent,
    CollectionCommasPipe,
  ],
  templateUrl: './thread-card.component.html',
  styleUrl: './thread-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThreadCardComponent {
  @Input() thread: Thread | null = null;
  @Input() messages: Message[] | null = null;

  @Output() submitEvent = new EventEmitter<{
    content: string;
    attachments: File[];
  }>();

  @Output() updateMessageEmojiEvent = new EventEmitter<{
    messageId: string;
    emoji: string[];
  }>();

  trackBy(_: any, message: Message) {
    return message.id;
  }

  submit(event: { content: string; attachments: File[] }) {
    const { content, attachments } = event;

    this.submitEvent.emit({
      content,
      attachments,
    });
  }

  selectEmoji(emoji: string[], message: Message) {
    this.updateMessageEmojiEvent.emit({
      messageId: message.id,
      emoji
    });
  }
}
