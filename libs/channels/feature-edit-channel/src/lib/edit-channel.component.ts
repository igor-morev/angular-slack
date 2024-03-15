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
} from '@taiga-ui/kit';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import {
  TuiButtonModule,
  TuiDataListModule,
  TuiDialogContext,
  TuiGroupModule,
  TuiLabelModule,
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
import { TuiIdentityMatcher, TuiLetModule } from '@taiga-ui/cdk';
import { ChannelsApiActions } from '@angular-slack/data-access-channels';

@Component({
  selector: 'as-edit-channel',
  standalone: true,
  imports: [
    CommonModule,
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
    TuiLabelModule,
  ],
  templateUrl: './edit-channel.component.html',
  styleUrl: './edit-channel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditChannelComponent {
  channel!: Channel;

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    topic: new FormControl<string | null>(null),
    users: new FormControl<User[]>([], Validators.required),
  });

  get membersCount() {
    return this.form.value.users?.length || 0;
  }

  private readonly userApiService = inject(UserApiService);
  private readonly store = inject(Store);

  users$ = this.userApiService.getUsers();

  identityMatcher: TuiIdentityMatcher<User> = (e, t) => {
    return e.id === t.id;
  };

  constructor(
    @Inject(POLYMORPHEUS_CONTEXT)
    private readonly context: TuiDialogContext<boolean, Channel>
  ) {
    this.channel = context.data;

    const { name, topic, users } = this.channel;

    this.form.setValue({
      name,
      topic: topic || null,
      users,
    });
  }

  stringify = (user: User) => {
    return user.username;
  };

  submit() {
    const { name, topic, users } = this.form.value;

    if (name && users) {
      this.store.dispatch(
        ChannelsApiActions.update({
          id: this.channel.id,
          topic: topic!,
          name,
          users: users.map((user) => user.id!),
        })
      );

      this.context.completeWith(true);
    }
  }
}
