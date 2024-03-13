import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { map, takeUntil, delay, filter, switchMap } from 'rxjs';
import { Store } from '@ngrx/store';
import { TuiDestroyService } from '@taiga-ui/cdk';
import {
  MessagesApiActions,
  selectMessagesByChatId,
  selectScrollToMessageIndex,
} from '@angular-slack/data-access-messages';
import { TuiAvatarModule } from '@taiga-ui/kit';
import { TuiSvgModule } from '@taiga-ui/core';
import {
  CdkVirtualScrollViewport,
  ScrollingModule,
} from '@angular/cdk/scrolling';
import {
  selectContactByChatId,
  selectContactSelection,
  selectSelectedContactEntity,
} from '@angular-slack/data-access-contacts';
import { ChatMessageComponent } from 'libs/shared/ui-message/src';
import { MessageEditorComponent } from '@angular-slack/message-editor';
import { Contact, Message } from '@angular-slack/slack-api';
import { ThreadChatViewComponent } from '@angular-slack/thread-chat-view';
import { SecondaryViewStore } from '@angular-slack/ui-store';

@Component({
  selector: 'as-primary-view',
  standalone: true,
  imports: [
    CommonModule,
    TuiAvatarModule,
    TuiSvgModule,
    ScrollingModule,
    ChatMessageComponent,
    MessageEditorComponent,
  ],
  templateUrl: './primary-view.component.html',
  styleUrl: './primary-view.component.scss',
  providers: [TuiDestroyService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrimaryViewComponent implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private store = inject(Store);
  private destroy$ = inject(TuiDestroyService);
  private secondaryViewStore = inject(SecondaryViewStore);

  chatId$ = this.route.paramMap.pipe(map((value) => value.get('chatId')));

  chat$ = this.store.select(selectSelectedContactEntity);
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
          selectContactByChatId({
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

  openThread(message: Message, chat: Contact) {
    this.secondaryViewStore.close();
    setTimeout(() => {
      this.secondaryViewStore.open('thread', ThreadChatViewComponent, {
        messageId: message.id,
        chat,
      });
    });
  }

  trackBy(_: any, message: Message): string {
    return message.id;
  }

  submit(event: { content: string; attachments: File[] }, chatId: string) {
    const { content, attachments } = event;
    this.store.dispatch(
      MessagesApiActions.send({
        chatId,
        attachments,
        content: content,
      })
    );
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

  ngOnDestroy() {
    this.store.dispatch(selectContactSelection());
  }
}
