import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Message } from './models/message';

@Injectable({
  providedIn: 'root',
})
export class MessageApiService {
  messages: Map<string, Message[]> = new Map([
    [
      '1',
      [
        {
          id: `1`,
          content: 'Hi, there',
          updatedAt: new Date().toISOString(),
          author: {
            username: 'Steve Jobs',
          },
        } as Message,
      ],
    ],
  ]);

  sendMessageContact(chatId: string): Observable<Message> {
    const newMessage: Message = {
      id: `${+new Date()}`,
      content: 'Hi, there',
      updatedAt: new Date().toISOString(),
      author: {
        username: 'Steve Jobs',
      },
    } as Message;

    this.messages.get(chatId)!.push(newMessage);

    return of(newMessage);
  }

  getMessagesBy(chatId: string): Observable<Message[]> {
    return of(this.messages.get(chatId)!);
  }
}
