import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  HostListener,
  inject,
  Input,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

type InputFile = File | File[] | null;

@Component({
  selector: 'as-input-file',
  standalone: true,
  templateUrl: './input-file.component.html',
  styleUrls: ['./input-file.component.scss'],
  imports: [CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: InputFileComponent,
      multi: true,
    },
  ],
})
export class InputFileComponent<T> implements ControlValueAccessor {
  @ViewChild('input') input: ElementRef<HTMLInputElement> | undefined;

  @Input() multiple = false;

  private _onChange!: (file: InputFile) => void;

  private files: InputFile = null;

  private host = inject(ElementRef<T>);

  @HostListener('change', ['$event.target.files']) emitFiles(event: FileList) {
    if (this.multiple) {
      this.addMultipleFiles(event);
    } else {
      this.files = event.item(0);
    }

    this._onChange(this.files);
  }

  @HostListener('click') click() {
    if (this.input) {
      this.input.nativeElement.click();
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  writeValue(_value: null) {
    // clear file input
    this.host.nativeElement.value = '';
    this.files = null;
  }

  registerOnChange(fn: (file: InputFile) => void) {
    this._onChange = fn;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  registerOnTouched(_fn: () => void) {}

  private addMultipleFiles(event: FileList) {
    for (let i = 0; i < event.length; i++) {
      if (Array.isArray(this.files) || this.files === null) {
        this.files = this.files || [];

        this.files = [...this.files, event.item(i)!];
      }
    }
  }
}
