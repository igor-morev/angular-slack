import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiAvatarModule } from '@taiga-ui/kit';
import { Message } from '@angular-slack/slack-api';
import { FilePreviewComponent } from '@angular-slack/file-preview';

@Component({
  selector: 'as-chat-message',
  standalone: true,
  imports: [CommonModule, TuiAvatarModule, FilePreviewComponent],
  templateUrl: './chat-message.component.html',
  styleUrl: './chat-message.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatMessageComponent {
  @Input() message: Message = {} as Message;
}
