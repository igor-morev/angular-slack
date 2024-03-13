import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
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
import {
  TuiButtonModule,
  TuiDialogService,
  TuiSvgModule,
} from '@taiga-ui/core';
import { TuiAvatarModule } from '@taiga-ui/kit';
import {
  MessagesApiActions,
  selectMessagesByChatId,
  selectScrollToMessageIndex,
} from '@angular-slack/data-access-messages';
import { delay, filter, map, switchMap, takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import {
  resetChannelSelection,
  selectChannelByChatId,
  selectSelectedChannelsEntity,
} from '@angular-slack/data-access-channels';
import { Channel, Message } from '@angular-slack/slack-api';
import { SecondaryViewStore } from '@angular-slack/ui-store';
import { ThreadChatViewComponent } from '@angular-slack/thread-chat-view';
import { MessageEditorComponent } from '@angular-slack/message-editor';
import { EditChannelComponent } from '@angular-slack/edit-channel';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';

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
    TuiButtonModule,
  ],
  templateUrl: './channel-chat-view.component.html',
  styleUrl: './channel-chat-view.component.scss',
  providers: [TuiDestroyService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChannelChatViewComponent implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private store = inject(Store);
  private secondaryViewStore = inject(SecondaryViewStore);

  private destroy$ = inject(TuiDestroyService);
  private readonly tuiDialogService = inject(TuiDialogService);

  chatId$ = this.route.paramMap.pipe(map((value) => value.get('chatId')));

  chat$ = this.store.select(selectSelectedChannelsEntity);
  messages$ = this.chatId$.pipe(
    filter((chatId) => !!chatId),
    switchMap((chatId) => this.store.select(selectMessagesByChatId(chatId!)))
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
          MessagesApiActions.init({
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

  openThread(message: Message, chat: Channel) {
    this.secondaryViewStore.close();
    setTimeout(() => {
      this.secondaryViewStore.open('thread', ThreadChatViewComponent, {
        messageId: message.id,
        chat,
      });
    });
  }

  selectEmoji(emoji: string[], message: Message, chatId: string) {
    this.store.dispatch(
      MessagesApiActions.update({
        id: message.id,
        chatId,
        updateParams: {
          emoji,
        },
      })
    );
  }

  trackBy(_: unknown, message: Message): string {
    return message.id;
  }

  submit(event: { content: string; attachments: File[] }, chatId: string) {
    const { content, attachments } = event;
    this.store.dispatch(
      MessagesApiActions.send({
        chatId,
        attachments,
        content,
      })
    );
  }

  openEditChannel(channel: Channel) {
    this.tuiDialogService
      .open<Channel>(new PolymorpheusComponent(EditChannelComponent), {
        label: channel.name,
        data: channel,
        dismissible: true,
        closeable: true,
      })
      .subscribe();
  }

  ngOnDestroy() {
    this.store.dispatch(resetChannelSelection());
  }
}
