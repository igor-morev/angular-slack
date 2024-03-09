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
  selectMessagesEntities,
  selectScrollToMessageIndex,
  sendThreadMessage,
  updateMessage,
} from '@angular-slack/data-access-messages';
import { MessageEditorComponent } from '@angular-slack/message-editor';
import { FilePreviewComponent } from '@angular-slack/file-preview';
import { ChatMessageComponent } from '@angular-slack/chat-message';
import {
  CdkVirtualScrollViewport,
  ScrollingModule,
} from '@angular/cdk/scrolling';
import { combineLatest, delay, map, Observable, of, takeUntil } from 'rxjs';
import { Message } from '@angular-slack/slack-api';
import { TuiDestroyService, TuiLetModule } from '@taiga-ui/cdk';
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
  @Input() messageId!: string;

  private secondaryViewStore = inject(SecondaryViewStore);
  private store = inject(Store);
  private destroy$ = inject(TuiDestroyService);

  messages$: Observable<Message[]> = of([] as Message[]);

  threadMessage$!: Observable<Message>;

  @ViewChild(CdkVirtualScrollViewport)
  virtualScrollViewport?: CdkVirtualScrollViewport;

  selectScrollToMessageIndex$ = this.store.select(selectScrollToMessageIndex);

  ngOnInit() {
    this.threadMessage$ = this.store
      .select(selectMessagesEntities)
      .pipe(map((messages) => messages[this.messageId!]!));

    this.messages$ = combineLatest([this.threadMessage$, this.store
      .select(selectMessagesByChatId(this.messageId!))])
      .pipe(
        map(([threadMessage, messages]) => [
          {
            ...threadMessage,
            thread: null,
            mode: 'full',
          },
          ...messages,
        ])
      );

      this.store.dispatch(
        initMessages({
          chatId: this.messageId,
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

  trackBy(_: any, message: Message): string {
    return message.id;
  }

  submit(
    event: { content: string; attachments: File[] },
    threadMessage: Message
  ) {
    const { content, attachments } = event;

    this.store.dispatch(
      sendThreadMessage({
        threadId: threadMessage.thread ? threadMessage.thread.id! : null,
        parentMessage: threadMessage,
        attachments,
        content,
      })
    );
  }

  selectEmoji(emoji: string[], message: Message) {
    this.store.dispatch(updateMessage({
      id: message.id,
      chatId: message.chatId,
      updateParams: {
        emoji,
      }
    }))
   
  }

  close() {
    this.secondaryViewStore.close();
  }
}
