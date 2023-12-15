import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'as-tab-rail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tab-rail.component.html',
  styleUrl: './tab-rail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabRailComponent {}
