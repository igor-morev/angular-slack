import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderToolbarComponent } from '@angular-slack/feature-header-toolbar';
import { TabRailComponent } from '@angular-slack/tab-rail/feature-tab-rail';
import { WorkspaceComponent } from '@angular-slack/workspace/feature-workspace';
import { AuthStore } from '@angular-slack/auth/data-access';
import { Store } from '@ngrx/store';
import { initClients } from '@angular-slack/client/data-access';
import { initContacts } from '@angular-slack/data-access-contacts';
import { initChannels } from '@angular-slack/data-access-channels';

@Component({
  selector: 'as-shell',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    HeaderToolbarComponent,
    TabRailComponent,
    WorkspaceComponent,
  ],
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.scss',
})
export class ShellComponent implements OnInit {
  private readonly authStore = inject(AuthStore);
  private readonly store = inject(Store);

  ngOnInit() {
    this.authStore.getUser();
    this.store.dispatch(initClients());

    this.store.dispatch(initContacts());

    this.store.dispatch(initChannels());
  }
}
