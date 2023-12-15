import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'as-primary-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './primary-view.component.html',
  styleUrl: './primary-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrimaryViewComponent {
  route = inject(ActivatedRoute);

  roomId$ = this.route.paramMap.pipe(map((value) => value.get('roomId')));

  constructor() {}
}
