import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiSvgModule } from '@taiga-ui/core';
import { SecondaryViewStore } from '@angular-slack/ui-store';
import { Store } from '@ngrx/store';
import {
  initMessages,
  selectAllMessages,
  selectMessagesByChatId,
  selectScrollToMessageIndex,
  sendMessage,
} from '@angular-slack/data-access-messages';
import { MessageEditorComponent } from '@angular-slack/message-editor';
import { FilePreviewComponent } from '@angular-slack/file-preview';
import { ChatMessageComponent } from '@angular-slack/chat-message';
import {
  CdkVirtualScrollViewport,
  ScrollingModule,
} from '@angular/cdk/scrolling';
import { delay, of, takeUntil } from 'rxjs';
import { Message } from '@angular-slack/slack-api';
import { TuiDestroyService } from '@taiga-ui/cdk';

@Component({
  selector: 'as-thread-chat-view',
  standalone: true,
  imports: [
    CommonModule,
    TuiSvgModule,
    MessageEditorComponent,
    FilePreviewComponent,
    ChatMessageComponent,
    ScrollingModule,
  ],
  templateUrl: './thread-chat-view.component.html',
  styleUrl: './thread-chat-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TuiDestroyService],
})
export class ThreadChatViewComponent implements OnInit {
  @Input() title!: string;
  @Input() chatId!: string;

  private secondaryViewStore = inject(SecondaryViewStore);
  private store = inject(Store);
  private destroy$ = inject(TuiDestroyService);

  messages$ = of([] as Message[]);

  @ViewChild(CdkVirtualScrollViewport)
  virtualScrollViewport?: CdkVirtualScrollViewport;

  selectScrollToMessageIndex$ = this.store.select(selectScrollToMessageIndex);

  close() {
    this.secondaryViewStore.close();
  }

  ngOnInit() {
    this.messages$ = this.store.select(selectMessagesByChatId(this.chatId!));

    if (this.chatId) {
      this.store.dispatch(
        initMessages({
          chatId: this.chatId,
        })
      );
    }

    this.selectScrollToMessageIndex$
      .pipe(delay(0), takeUntil(this.destroy$))
      .subscribe((index) => {
        if (index !== undefined && this.virtualScrollViewport) {
          this.virtualScrollViewport.scrollToIndex(index);
        }
      });
  }

  trackBy(_: any, message: Message): string {
    return message.id;
  }

  submit(event: { content: string; attachments: File[] }, chatId: string) {
    const { content, attachments } = event;
    this.store.dispatch(
      sendMessage({
        chatId,
        attachments,
        content: content,
      })
    );
  }
}
