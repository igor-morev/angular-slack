import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
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
import { selectSelectedContactEntity } from '@angular-slack/data-access-contacts';
import { InputFileComponent } from '../input-file/input-file.component';

@Component({
  selector: 'as-message-editor',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    QuillModule,
    TuiButtonModule,
    InputFileComponent,
  ],
  templateUrl: './message-editor.component.html',
  styleUrl: './message-editor.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageEditorComponent {
  store = inject(Store);

  messageForm = new FormGroup({
    text: new FormControl('', Validators.required),
    attachments: new FormControl([]),
  });

  // Todo: create own abstract interface for this component like MessageEditorConfig
  chat$ = this.store.select(selectSelectedContactEntity);

  ngOnInit() {
    this.messageForm.valueChanges.subscribe((value) => {
      console.log(value);
    });
  }

  onSubmit(chatId: string) {
    if (this.messageForm.value.text) {
      this.store.dispatch(
        sendMessage({
          chatId,
          content: this.messageForm.value.text,
        })
      );

      this.messageForm.controls.text.patchValue('');
    }
  }
}
