import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  TuiAvatarModule,
  TuiDataListWrapperModule,
  TuiInputModule,
  TuiMultiSelectModule,
  TuiTabsModule,
} from '@taiga-ui/kit';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import {
  TuiButtonModule,
  TuiDataListModule,
  TuiDialogContext,
  TuiGroupModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import { Channel, UserApiService } from '@angular-slack/slack-api';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { User } from '@angular-slack/auth/data-access';
import { Store } from '@ngrx/store';
import { TuiLetModule } from '@taiga-ui/cdk';
import { ChannelsApiActions } from '@angular-slack/data-access-channels';

@Component({
  selector: 'as-edit-channel',
  standalone: true,
  imports: [
    CommonModule,
    TuiTabsModule,
    TuiButtonModule,
    TuiGroupModule,
    ReactiveFormsModule,
    TuiInputModule,
    TuiTextfieldControllerModule,
    TuiMultiSelectModule,
    TuiDataListModule,
    TuiDataListWrapperModule,
    TuiAvatarModule,
    TuiLetModule,
  ],
  templateUrl: './edit-channel.component.html',
  styleUrl: './edit-channel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditChannelComponent {
  activeItemIndex = 0;
  channel!: Channel;

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    topic: new FormControl('', Validators.required),
    users: new FormControl<User[]>([], Validators.required),
  });

  private readonly userApiService = inject(UserApiService);
  private readonly store = inject(Store);

  users$ = this.userApiService.getUsers();

  constructor(
    @Inject(POLYMORPHEUS_CONTEXT)
    private readonly context: TuiDialogContext<boolean, Channel>
  ) {
    this.channel = context.data;
  }

  stringify = (user: User) => {
    return user.username;
  };

  submit() {
    if (this.form.value.name && this.form.value.users) {
      this.store.dispatch(
        ChannelsApiActions.update({
          id: this.channel.id,
          topic: this.form.value.topic!,
          name: this.form.value.name,
          users: this.form.value.users.map((user) => user.id!),
        })
      );

      this.context.completeWith(true);
    }
  }
}
