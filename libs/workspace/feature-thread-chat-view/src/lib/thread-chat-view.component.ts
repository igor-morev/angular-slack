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
  selectMessagesByChatId,
  selectScrollToMessageIndex,
  sendThreadMessage,
} from '@angular-slack/data-access-messages';
import { MessageEditorComponent } from '@angular-slack/message-editor';
import { FilePreviewComponent } from '@angular-slack/file-preview';
import { ChatMessageComponent } from '@angular-slack/chat-message';
import {
  CdkVirtualScrollViewport,
  ScrollingModule,
} from '@angular/cdk/scrolling';
import { delay, map, Observable, of, takeUntil } from 'rxjs';
import { Message, Thread } from '@angular-slack/slack-api';
import { TuiDestroyService, TuiLetModule } from '@taiga-ui/cdk';
import { selectThreadsEntities } from '@angular-slack/data-access-threads';

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
    TuiLetModule,
  ],
  templateUrl: './thread-chat-view.component.html',
  styleUrl: './thread-chat-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TuiDestroyService],
})
export class ThreadChatViewComponent implements OnInit {
  @Input() message!: Message;

  private secondaryViewStore = inject(SecondaryViewStore);
  private store = inject(Store);
  private destroy$ = inject(TuiDestroyService);

  thread$: Observable<Thread | undefined | null> = of(null);

  messages$: Observable<Message[]> = of([] as Message[]);

  @ViewChild(CdkVirtualScrollViewport)
  virtualScrollViewport?: CdkVirtualScrollViewport;

  selectScrollToMessageIndex$ = this.store.select(selectScrollToMessageIndex);

  ngOnInit() {
    this.thread$ = this.store
      .select(selectThreadsEntities)
      .pipe(map((threads) => threads[this.message.id!]));

    this.messages$ = this.store
      .select(selectMessagesByChatId(this.message.id!))
      .pipe(
        map((messages) => [
          {
            ...this.message,
            thread: null,
            mode: 'full',
          },
          ...messages,
        ])
      );

    if (this.message.thread) {
      this.store.dispatch(
        initMessages({
          chatId: this.message.id,
        })
      );

      this.selectScrollToMessageIndex$
        .pipe(delay(0), takeUntil(this.destroy$))
        .subscribe((index) => {
          if (index !== undefined && this.virtualScrollViewport) {
            this.virtualScrollViewport.scrollToIndex(index);
          }
        });
    }
  }

  trackBy(_: any, message: Message): string {
    return message.id;
  }

  submit(
    event: { content: string; attachments: File[] },
    thread?: Thread | null
  ) {
    const { content, attachments } = event;

    this.store.dispatch(
      sendThreadMessage({
        threadId: thread ? thread.id : null,
        parentMessage: this.message,
        attachments,
        content,
      })
    );
  }

  close() {
    this.secondaryViewStore.close();
  }
}
