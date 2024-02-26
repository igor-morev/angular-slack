import {
  ChangeDetectionStrategy,
  Component,
  inject,
  ViewContainerRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { selectEntity } from '@angular-slack/client/data-access';
import { Store } from '@ngrx/store';
import { TuiExpandModule, TuiHintModule, TuiSvgModule } from '@taiga-ui/core';
import { TuiAvatarModule } from '@taiga-ui/kit';
import { TuiLetModule } from '@taiga-ui/cdk';
import { selectAllContacts } from '@angular-slack/data-access-contacts';
import { selectAllChannels } from '@angular-slack/data-access-channels';
import { ViewStore } from '@angular-slack/ui-store';

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

  private viewStore = inject(ViewStore);

  client$ = this.store.select(selectEntity);
  contacts$ = this.store.select(selectAllContacts);

  channels$ = this.store.select(selectAllChannels);

  contactsExpanded = true;
  channelsExpanded = true;

  get activeSecondaryView() {
    return this.viewStore.activeView();
  }

  constructor() {
    // subscribe to open component (T)
    this.viewStore.activeView;
  }

  open() {
    // this.ref.createComponent();
  }
}
