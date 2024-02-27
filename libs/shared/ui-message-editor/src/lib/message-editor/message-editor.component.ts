import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { TuiButtonModule } from '@taiga-ui/core';
import { InputFileComponent } from '../input-file/input-file.component';
import { FilePreviewComponent } from '@angular-slack/file-preview';

@Component({
  selector: 'as-message-editor',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    QuillModule,
    TuiButtonModule,
    InputFileComponent,
    FilePreviewComponent,
  ],
  templateUrl: './message-editor.component.html',
  styleUrl: './message-editor.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageEditorComponent {
  @Input() placeholder: string = '';

  @Output() submitEvent = new EventEmitter<{
    attachments: File[];
    content: string;
  }>();

  messageForm = new FormGroup({
    text: new FormControl('', Validators.required),
    attachments: new FormControl<File[]>([]),
  });

  get attachements() {
    return this.messageForm.value.attachments;
  }

  onSubmit() {
    if (this.messageForm.value.text) {
      this.submitEvent.emit({
        attachments: this.attachements!,
        content: this.messageForm.value.text,
      });

      this.messageForm.setValue({
        attachments: [],
        text: '',
      });
    }
  }

  deleteFile(file: File, index: number) {
    this.messageForm.controls.attachments.patchValue(
      this.attachements!.filter((file, i) => i !== index)
    );
  }
}
