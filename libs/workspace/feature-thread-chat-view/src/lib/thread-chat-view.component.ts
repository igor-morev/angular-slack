import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiButtonModule, TuiSvgModule } from '@taiga-ui/core';
import { ViewStore } from '@angular-slack/ui-store';

@Component({
  selector: 'as-thread-chat-view',
  standalone: true,
  imports: [CommonModule, TuiSvgModule],
  templateUrl: './thread-chat-view.component.html',
  styleUrl: './thread-chat-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThreadChatViewComponent {
  @Input() title!: string;
  @Input() chatId!: string;

  viewStore = inject(ViewStore);

  close() {
    this.viewStore.closeView();
  }
}
