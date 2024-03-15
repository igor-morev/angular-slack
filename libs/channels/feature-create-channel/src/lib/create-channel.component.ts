import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  TuiAvatarModule,
  TuiDataListWrapperModule,
  TuiInputModule,
  TuiMultiSelectModule,
} from '@taiga-ui/kit';
import {
  TuiButtonModule,
  TuiDataListModule,
  TuiDialogContext,
  TuiLabelModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import { UserApiService } from '@angular-slack/slack-api';
import { TuiLetModule } from '@taiga-ui/cdk';
import { User } from '@angular-slack/auth/data-access';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { Store } from '@ngrx/store';
import { ChannelsApiActions } from '@angular-slack/data-access-channels';

@Component({
  selector: 'as-create-channel',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TuiInputModule,
    TuiTextfieldControllerModule,
    TuiMultiSelectModule,
    TuiDataListModule,
    TuiDataListWrapperModule,
    TuiAvatarModule,
    TuiLetModule,
    TuiButtonModule,
    TuiLabelModule,
  ],
  templateUrl: './create-channel.component.html',
  styleUrl: './create-channel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateChannelComponent {
  readonly form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(80)]),
    users: new FormControl<User[]>([], [Validators.required]),
  });

  private readonly userApiService = inject(UserApiService);
  private readonly store = inject(Store);

  users$ = this.userApiService.getUsers();

  constructor(
    @Inject(POLYMORPHEUS_CONTEXT)
    private readonly context: TuiDialogContext<boolean>
  ) {}

  stringify = (user: User) => {
    return user.username;
  };

  submit() {
    const { name, users } = this.form.value;

    if (name && users) {
      this.store.dispatch(
        ChannelsApiActions.create({
          name,
          users: users.map((user) => user.id!),
        })
      );

      this.context.completeWith(true);
    }
  }
}
