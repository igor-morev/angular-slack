import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Message } from './models/message';

@Injectable({
  providedIn: 'root',
})
export class MessageApiService {
  messages: Map<string, Message[]> = new Map([['1', []]]);

  sendMessageContact(chatId: string): Observable<Message> {
    const newMessage: Message = {
      id: `${+new Date()}`,
      content: 'Hi, there',
      updatedAt: new Date().toISOString(),
      author: {
        username: 'John Frank',
      },
    } as Message;

    this.messages.get(chatId)!.push(newMessage);

    return of(newMessage);
  }

  getMessages(chatId: string): Observable<Message[]> {
    return of(this.messages.get(chatId)!);
  }
}
