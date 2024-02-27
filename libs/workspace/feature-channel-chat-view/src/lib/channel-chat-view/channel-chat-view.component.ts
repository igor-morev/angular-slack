import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatMessageComponent } from 'libs/shared/ui-message/src';
import {
  CdkVirtualScrollViewport,
  ScrollingModule,
} from '@angular/cdk/scrolling';
import { TuiDestroyService } from '@taiga-ui/cdk';
import { TuiSvgModule } from '@taiga-ui/core';
import { TuiAvatarModule } from '@taiga-ui/kit';
import {
  initMessages,
  selectAllMessages,
  selectMessagesByChatId,
  selectScrollToMessageIndex,
  sendMessage,
} from '@angular-slack/data-access-messages';
import { delay, filter, map, switchMap, takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import {
  selectChannelByChatId,
  selectSelectedChannelsEntity,
} from '@angular-slack/data-access-channels';
import { ChannelApiService, Thread } from '@angular-slack/slack-api';
import { SecondaryViewStore } from '@angular-slack/ui-store';
import { ThreadChatViewComponent } from '@angular-slack/thread-chat-view';
import { MessageEditorComponent } from '@angular-slack/message-editor';

@Component({
  selector: 'as-channel-chat-view',
  standalone: true,
  imports: [
    CommonModule,
    TuiAvatarModule,
    TuiSvgModule,
    ScrollingModule,
    ChatMessageComponent,
    MessageEditorComponent,
  ],
  templateUrl: './channel-chat-view.component.html',
  styleUrl: './channel-chat-view.component.scss',
  providers: [TuiDestroyService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChannelChatViewComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private store = inject(Store);
  private secondaryViewStore = inject(SecondaryViewStore);

  private destroy$ = inject(TuiDestroyService);

  private channelApiService = inject(ChannelApiService);

  chatId$ = this.route.paramMap.pipe(map((value) => value.get('chatId')));

  chat$ = this.store.select(selectSelectedChannelsEntity);
  messages$ = this.chatId$.pipe(
    filter((chatId) => !!chatId),
    switchMap((chatId) => this.store.select(selectMessagesByChatId(chatId!)))
  );

  users$ = this.chatId$.pipe(
    switchMap((chatId) => this.channelApiService.getChannelUsers(chatId!))
  );

  @ViewChild(CdkVirtualScrollViewport)
  virtualScrollViewport?: CdkVirtualScrollViewport;

  selectScrollToMessageIndex$ = this.store.select(selectScrollToMessageIndex);

  ngOnInit() {
    this.chatId$
      .pipe(
        filter((chatId) => !!chatId),
        takeUntil(this.destroy$)
      )
      .subscribe((chatId) => {
        this.store.dispatch(
          selectChannelByChatId({
            chatId: chatId!,
          })
        );

        this.store.dispatch(
          initMessages({
            chatId: chatId!,
          })
        );
      });

    this.selectScrollToMessageIndex$
      .pipe(delay(0), takeUntil(this.destroy$))
      .subscribe((index) => {
        if (index !== undefined && this.virtualScrollViewport) {
          this.virtualScrollViewport.scrollToIndex(index);
        }
      });
  }

  openThread(thread: Thread) {
    this.secondaryViewStore.open('thread', ThreadChatViewComponent, {
      chatId: thread.chatId,
      title: 'Thread',
    });
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
