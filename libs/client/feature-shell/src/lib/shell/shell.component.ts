import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderToolbarComponent } from '@angular-slack/feature-header-toolbar';
import { TabRailComponent } from '@angular-slack/tab-rail/feature-tab-rail';
import { WorkspaceComponent } from '@angular-slack/workspace/feature-workspace';

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
export class ShellComponent {}
