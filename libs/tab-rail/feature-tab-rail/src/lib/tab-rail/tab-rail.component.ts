import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthStore } from '@angular-slack/auth/data-access';
import { Store } from '@ngrx/store';
import {
  selectAllClients,
  selectEntity,
} from '@angular-slack/client/data-access';
import { TuiHintModule, TuiSvgModule } from '@taiga-ui/core';
import { TuiAvatarModule } from '@taiga-ui/kit';

@Component({
  selector: 'as-tab-rail',
  standalone: true,
  imports: [CommonModule, TuiSvgModule, TuiHintModule, TuiAvatarModule],
  templateUrl: './tab-rail.component.html',
  styleUrl: './tab-rail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabRailComponent {
  private readonly authStore = inject(AuthStore);
  private readonly store = inject(Store);

  client$ = this.store.select(selectEntity);
  clients$ = this.store.select(selectAllClients);

  user = this.authStore.user;

  constructor() {}
}
