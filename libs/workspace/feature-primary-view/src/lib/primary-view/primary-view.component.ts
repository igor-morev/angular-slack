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
import {
  selectContactByChatId,
  selectSelectedContactEntity,
} from 'libs/workspace/data-access-contacts/src';
import { TuiDestroyService } from '@taiga-ui/cdk';
import {
  initMessages,
  selectAllMessages,
  sendMessage,
} from '@angular-slack/data-access-messages';
import { QuillModule } from 'ngx-quill';
import { TuiAvatarModule } from '@taiga-ui/kit';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TuiButtonModule, TuiSvgModule } from '@taiga-ui/core';
import { ScrollingModule } from '@angular/cdk/scrolling';

@Component({
  selector: 'as-primary-view',
  standalone: true,
  imports: [
    CommonModule,
    QuillModule,
    TuiAvatarModule,
    ReactiveFormsModule,
    TuiSvgModule,
    ScrollingModule,
    TuiButtonModule,
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

  messageForm = new FormGroup({
    text: new FormControl('', Validators.required),
  });

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

  onSubmit(chatId: string) {
    if (this.messageForm.value.text) {
      this.store.dispatch(
        sendMessage({
          chatId,
          content: this.messageForm.value.text,
        })
      );

      this.messageForm.controls.text.patchValue('');
    }
  }
}
