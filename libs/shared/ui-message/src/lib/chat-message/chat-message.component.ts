import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Inject,
  Input,
  Output,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiAvatarModule } from '@taiga-ui/kit';
import { Message } from '@angular-slack/slack-api';
import { FilePreviewComponent } from '@angular-slack/file-preview';

import { PickerComponent } from '@ctrl/ngx-emoji-mart';

import {
  OverlayModule,
  OverlayConfig,
  Overlay,
  OverlayRef,
} from '@angular/cdk/overlay';

import {
  TuiButtonModule,
  TuiDataListModule,
  TuiDialogModule,
  TuiDialogService,
  TuiDropdownModule,
  TuiHostedDropdownModule,
  TuiSvgModule,
} from '@taiga-ui/core';

import { TuiDestroyService } from '@taiga-ui/cdk';
import { TemplatePortal } from '@angular/cdk/portal';
import { takeUntil } from 'rxjs';

type DropdownConfig = Partial<Record<'emoji' | 'thread', boolean>>;

@Component({
  selector: 'as-chat-message',
  standalone: true,
  imports: [
    CommonModule,
    TuiAvatarModule,
    FilePreviewComponent,
    TuiDialogModule,
    TuiSvgModule,
    TuiDropdownModule,
    TuiHostedDropdownModule,
    TuiDataListModule,
    TuiButtonModule,
    PickerComponent,
    OverlayModule,
  ],
  templateUrl: './chat-message.component.html',
  styleUrl: './chat-message.component.scss',
  providers: [TuiDestroyService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatMessageComponent {
  private _config = new OverlayConfig({});

  @ViewChild('contentSample')
  readonly contentSample?: TemplateRef<Record<string, unknown>>;

  @ViewChild('emojiContent')
  readonly emojiContent?: TemplateRef<unknown>;

  @Input({ required: true }) message!: Message | null;

  @Input() dropdownConfig: DropdownConfig = {
    emoji: true,
    thread: true,
  };

  @Output() openThreadEvent = new EventEmitter<Message>();
  @Output() selectEmojiEvent = new EventEmitter<string[]>();

  dropdownOpen = false;
  emojiOverlayRef?: OverlayRef;

  get hasDropdown() {
    if (this.dropdownConfig) {
      return Object.keys(this.dropdownConfig).some(
        (key) => this.dropdownConfig[key as keyof DropdownConfig]
      );
    }

    return false;
  }

  constructor(
    @Inject(TuiDialogService)
    private readonly dialogs: TuiDialogService,
    private overlay: Overlay,
    private containerRef: ViewContainerRef,
    private destroy$: TuiDestroyService
  ) {}

  show(file: File): void {
    this.dialogs
      .open(this.contentSample, {
        data: file,
      })
      .pipe(takeUntil(this.destroy$))
      .subscribe();
  }

  openThread() {
    this.openThreadEvent.emit(this.message!);
  }

  openEmojiPanel(event: MouseEvent) {
    this._config.positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo({
        x: event.clientX,
        y: event.clientY,
      })
      .withPositions([
        {
          originX: 'center',
          originY: 'center',
          overlayX: 'start',
          overlayY: 'top',
        },
        {
          originX: 'center',
          originY: 'center',
          overlayX: 'start',
          overlayY: 'center',
        },
        {
          originX: 'center',
          originY: 'center',
          overlayX: 'start',
          overlayY: 'bottom',
        },
      ]);

    this.emojiOverlayRef = this.overlay.create(this._config);

    const filePreviewPortal = new TemplatePortal(
      this.emojiContent!,
      this.containerRef
    );

    this.emojiOverlayRef.attach(filePreviewPortal);
    this.emojiOverlayRef
      .outsidePointerEvents()
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        if (this.emojiOverlayRef) {
          this.emojiOverlayRef.detach();
        }
      });
  }

  onEmojiDelete(emoji: string) {
    const htmlCodes = this.message!.emoji || [];

    this.selectEmojiEvent.emit(htmlCodes.filter((code) => code !== emoji));
  }

  onEmojiSelect(event: {
    emoji: {
      unified: string;
    };
  }) {
    const htmlCode = `&#x${event.emoji.unified}`;
    const htmlCodes = this.message!.emoji || [];
    const updatedHtmlCodes = htmlCodes.includes(htmlCode)
      ? htmlCodes.filter((code) => code !== htmlCode)
      : [...htmlCodes, htmlCode];

    this.selectEmojiEvent.emit(updatedHtmlCodes);
    if (this.emojiOverlayRef) {
      this.emojiOverlayRef.detach();
    }
  }
}
