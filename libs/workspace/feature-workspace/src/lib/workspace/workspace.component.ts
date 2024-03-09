import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { selectEntity } from '@angular-slack/client/data-access';
import { Store } from '@ngrx/store';
import { TuiExpandModule, TuiHintModule, TuiSvgModule } from '@taiga-ui/core';
import { TuiAvatarModule } from '@taiga-ui/kit';
import { TuiLetModule } from '@taiga-ui/cdk';
import { ContactsApiActions, selectAllContacts } from '@angular-slack/data-access-contacts';
import { ChannelsApiActions, selectAllChannels } from '@angular-slack/data-access-channels';
import { SecondaryViewStore } from '@angular-slack/ui-store';

@Component({
  selector: 'as-workspace',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TuiSvgModule,
    TuiHintModule,
    TuiAvatarModule,
    TuiLetModule,
    TuiExpandModule,
  ],
  templateUrl: './workspace.component.html',
  styleUrl: './workspace.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkspaceComponent {
  private readonly store = inject(Store);

  private secondaryViewStore = inject(SecondaryViewStore);

  client$ = this.store.select(selectEntity);
  contacts$ = this.store.select(selectAllContacts);

  channels$ = this.store.select(selectAllChannels);

  contactsExpanded = true;
  channelsExpanded = true;

  ngOnInit() {
    this.store.dispatch(ContactsApiActions.init());
    this.store.dispatch(ChannelsApiActions.init());
  }

  get activeSecondaryView() {
    return this.secondaryViewStore.activeView();
  }

  selectMenuItem() {
    this.secondaryViewStore.close();
  }
}
