import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiAvatarModule } from '@taiga-ui/kit';
import { Message } from '@angular-slack/slack-api';

@Component({
  selector: 'as-chat-message',
  standalone: true,
  imports: [CommonModule, TuiAvatarModule],
  templateUrl: './chat-message.component.html',
  styleUrl: './chat-message.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatMessageComponent {
  @Input() message: Message = {} as Message;
}
