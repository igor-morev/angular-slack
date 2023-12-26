import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { map, takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';
import { TuiDestroyService } from '@taiga-ui/cdk';
import {
  initMessages,
  selectAllMessages,
} from '@angular-slack/data-access-messages';
import { TuiAvatarModule } from '@taiga-ui/kit';
import { TuiSvgModule } from '@taiga-ui/core';
import { ScrollingModule } from '@angular/cdk/scrolling';
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
  route = inject(ActivatedRoute);
  store = inject(Store);
  destroy$ = inject(TuiDestroyService);

  chat$ = this.store.select(selectSelectedContactEntity);
  messages$ = this.store.select(selectAllMessages);

  chatId$ = this.route.paramMap.pipe(map((value) => value.get('chatId')));

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
  }
}
