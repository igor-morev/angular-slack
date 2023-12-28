import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiMarkerIconModule } from '@taiga-ui/kit';

@Component({
  selector: 'as-file-preview',
  standalone: true,
  imports: [CommonModule, TuiMarkerIconModule],
  templateUrl: './file-preview.component.html',
  styleUrl: './file-preview.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilePreviewComponent {
  @Input() file!: File;

  @Input() showDelete = false;

  @Output() deleteEvent = new EventEmitter<File>();

  delete() {
    this.deleteEvent.emit(this.file);
  }
}
