import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { selectEntity } from '@angular-slack/client/data-access';
import { Store } from '@ngrx/store';
import { selectAllContacts } from '@angular-slack/data-access-contacts';
import { TuiHintModule, TuiSvgModule } from '@taiga-ui/core';
import { TuiAvatarModule } from '@taiga-ui/kit';

@Component({
  selector: 'as-workspace',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TuiSvgModule,
    TuiHintModule,
    TuiAvatarModule,
  ],
  templateUrl: './workspace.component.html',
  styleUrl: './workspace.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkspaceComponent {
  private readonly store = inject(Store);

  client$ = this.store.select(selectEntity);
  contacts$ = this.store.select(selectAllContacts);
}
