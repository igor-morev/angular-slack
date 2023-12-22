import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { map, takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  loadContactByChatActions,
  selectSelectedContactEntity,
} from '@angular-slack/data-access-contacts';
import { TuiDestroyService } from '@taiga-ui/cdk';
import {
  initMessages,
  selectAllMessages,
} from '@angular-slack/data-access-messages';

@Component({
  selector: 'as-primary-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './primary-view.component.html',
  styleUrl: './primary-view.component.scss',
  providers: [TuiDestroyService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrimaryViewComponent {
  route = inject(ActivatedRoute);
  store = inject(Store);
  destroy$ = inject(TuiDestroyService);

  chat$ = this.store.select(selectSelectedContactEntity);
  messages$ = this.store.select(selectAllMessages);

  chatId$ = this.route.paramMap.pipe(map((value) => value.get('chatId')));

  constructor() {
    this.chatId$.pipe(takeUntil(this.destroy$)).subscribe((chatId) => {
      if (chatId) {
        this.store.dispatch(
          loadContactByChatActions.loadContactByChat({
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

  ngOnInit() {
    this.route.url.subscribe((url) => {
      console.log(url);
    });
  }
}
