import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Inject,
  Input,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiAvatarModule } from '@taiga-ui/kit';
import { Message } from '@angular-slack/slack-api';
import { FilePreviewComponent } from '@angular-slack/file-preview';

import {
  TuiButtonModule,
  TuiDataListModule,
  TuiDialogModule,
  TuiDialogService,
  TuiDropdownModule,
  TuiHostedDropdownModule,
  TuiSvgModule,
} from '@taiga-ui/core';

import { TuiDestroyService } from '@taiga-ui/cdk';

@Component({
  selector: 'as-chat-message',
  standalone: true,
  imports: [
    CommonModule,
    TuiAvatarModule,
    FilePreviewComponent,
    TuiDialogModule,
    TuiSvgModule,
    TuiDropdownModule,
    TuiHostedDropdownModule,
    TuiDataListModule,
    TuiButtonModule,
  ],
  templateUrl: './chat-message.component.html',
  styleUrl: './chat-message.component.scss',
  providers: [TuiDestroyService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatMessageComponent {
  @ViewChild('contentSample')
  readonly contentSample?: TemplateRef<Record<string, unknown>>;

  @Input() message!: Message | null;

  @Output() openThreadEvent = new EventEmitter<Message>();
  @Input() hasDropdown = true;

  index = 0;

  open = false;

  constructor(
    @Inject(TuiDialogService)
    private readonly dialogs: TuiDialogService
  ) {}

  show(file: File): void {
    this.dialogs
      .open(this.contentSample, {
        data: file,
      })
      .subscribe();
  }

  openThread() {
    this.openThreadEvent.emit(this.message!);
  }
}
