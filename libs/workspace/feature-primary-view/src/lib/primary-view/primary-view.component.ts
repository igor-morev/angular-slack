import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { map, takeUntil, delay } from 'rxjs';
import { Store } from '@ngrx/store';
import { TuiDestroyService } from '@taiga-ui/cdk';
import {
  initMessages,
  selectAllMessages,
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
  selectSelectedContactEntity,
} from '@angular-slack/data-access-contacts';
import { ChatMessageComponent } from '@angular-slack/chat-message';
import { MessageEditorComponent } from '@angular-slack/message-editor';

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
export class PrimaryViewComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private store = inject(Store);
  private destroy$ = inject(TuiDestroyService);

  chat$ = this.store.select(selectSelectedContactEntity);
  messages$ = this.store.select(selectAllMessages);

  chatId$ = this.route.paramMap.pipe(map((value) => value.get('chatId')));

  @ViewChild(CdkVirtualScrollViewport)
  virtualScrollViewport?: CdkVirtualScrollViewport;

  selectScrollToMessageIndex$ = this.store.select(selectScrollToMessageIndex);

  ngOnInit() {
    this.chatId$.pipe(takeUntil(this.destroy$)).subscribe((chatId) => {
      if (chatId) {
        this.store.dispatch(
          selectContactByChatId({
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
