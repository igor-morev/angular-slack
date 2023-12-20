type URL = string;

export interface Attachment {
  id: string;
  messageId: string;
  type: 'video' | 'image';
  content: URL;
}
