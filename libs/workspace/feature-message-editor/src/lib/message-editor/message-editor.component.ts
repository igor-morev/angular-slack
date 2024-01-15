import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
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
import { sendMessage } from '@angular-slack/data-access-messages';
import { Store } from '@ngrx/store';
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
  @Input() chat: { chatId: string; name: string } | null = null;

  store = inject(Store);

  messageForm = new FormGroup({
    text: new FormControl('', Validators.required),
    attachments: new FormControl<File[]>([]),
  });

  get attachements() {
    return this.messageForm.value.attachments;
  }

  onSubmit(chatId: string) {
    if (this.messageForm.value.text) {
      this.store.dispatch(
        sendMessage({
          chatId,
          attachments: this.attachements!,
          content: this.messageForm.value.text,
        })
      );

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
