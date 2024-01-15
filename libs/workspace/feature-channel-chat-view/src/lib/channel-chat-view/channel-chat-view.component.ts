import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatMessageComponent } from '@angular-slack/chat-message';
import { MessageEditorComponent } from '@angular-slack/message-editor';
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
  selectScrollToMessageIndex,
} from '@angular-slack/data-access-messages';
import { delay, map, switchMap, takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import {
  selectChannelByChatId,
  selectSelectedChannelsEntity,
} from '@angular-slack/data-access-channels';
import { ChannelApiService } from '@angular-slack/slack-api';

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
  route = inject(ActivatedRoute);
  store = inject(Store);
  destroy$ = inject(TuiDestroyService);

  channelApiService = inject(ChannelApiService);

  chat$ = this.store.select(selectSelectedChannelsEntity);
  messages$ = this.store.select(selectAllMessages);

  chatId$ = this.route.paramMap.pipe(map((value) => value.get('chatId')));

  users$ = this.chatId$.pipe(
    switchMap((chatId) => this.channelApiService.getChannelUsers(chatId!))
  );

  @ViewChild(CdkVirtualScrollViewport)
  virtualScrollViewport?: CdkVirtualScrollViewport;

  selectScrollToMessageIndex$ = this.store.select(selectScrollToMessageIndex);

  ngOnInit() {
    this.chatId$.pipe(takeUntil(this.destroy$)).subscribe((chatId) => {
      console.log(chatId);
      if (chatId) {
        this.store.dispatch(
          selectChannelByChatId({
            chatId,
          })
        );

        this.store.dispatch(
          initMessages({
            chatId,
          })
        );
      }
    });

    this.selectScrollToMessageIndex$
      .pipe(delay(0), takeUntil(this.destroy$))
      .subscribe((index) => {
        if (index !== undefined && this.virtualScrollViewport) {
          this.virtualScrollViewport.scrollToIndex(index);
        }
      });
  }
}
