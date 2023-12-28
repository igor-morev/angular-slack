import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Input,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiAvatarModule } from '@taiga-ui/kit';
import { Message } from '@angular-slack/slack-api';
import { FilePreviewComponent } from '@angular-slack/file-preview';

import { TuiDialogModule, TuiDialogService } from '@taiga-ui/core';

import { TuiDestroyService } from '@taiga-ui/cdk';

@Component({
  selector: 'as-chat-message',
  standalone: true,
  imports: [
    CommonModule,
    TuiAvatarModule,
    FilePreviewComponent,
    TuiDialogModule,
  ],
  templateUrl: './chat-message.component.html',
  styleUrl: './chat-message.component.scss',
  providers: [TuiDestroyService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatMessageComponent {
  @ViewChild('contentSample')
  readonly contentSample?: TemplateRef<Record<string, unknown>>;

  @Input() message: Message = {} as Message;

  index = 0;

  constructor(
    @Inject(TuiDialogService)
    private readonly dialogs: TuiDialogService
  ) {}

  get title(): string {
    return 'Heading';
  }

  show(file: File): void {
    this.dialogs
      .open(this.contentSample, {
        data: file,
      })
      .subscribe();
  }
}
