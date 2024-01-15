import { AuthService } from '@angular-slack/auth/data-access';
import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Message } from './models/message';

@Injectable({
  providedIn: 'root',
})
export class MessageApiService {
  private authService = inject(AuthService);

  messages: Map<string, Message[]> = new Map([
    [
      '1',
      Array.from(
        { length: 10 },
        (v, k) =>
          ({
            id: `${+new Date()}${k}`,
            content: 'Hi, there',
            mode: 'full',
            createdAt: new Date().toISOString(),
            author: {
              username: `Steve Jobs ${k}`,
            },
          } as Message)
      ),
    ],
    [
      '4',
      [
        {
          id: `${+new Date()}`,
          content: '234dfgdfg',
          createdAt: new Date().toISOString(),
          author: {
            username: 'Steve Jobs',
          },
        } as Message,
      ],
    ],
    [
      'channel-1',
      [
        {
          id: `${+new Date()}`,
          content: 'Hello',
          createdAt: new Date().toISOString(),
          author: {
            username: 'Jeff Bezos',
          },
        } as Message,
        {
          id: `${+new Date() + 1}`,
          content: 'Greetings',
          createdAt: new Date().toISOString(),
          author: {
            username: 'Elon Mask',
          },
        } as Message,
        {
          id: `${+new Date() + 2}`,
          content: 'What`s up',
          createdAt: new Date().toISOString(),
          author: {
            username: 'Bill Gates',
          },
        } as Message,
      ],
    ],
  ]);

  sendMessage(
    chatId: string,
    content: string,
    attachments: File[]
  ): Observable<Message> {
    const newMessage: Message = {
      id: `${+new Date()}`,
      content,
      createdAt: new Date().toISOString(),
      attachments,
      author: {
        username: 'Steve Jobs 9',
      },
    } as Message;

    this.messages.set(chatId, this.messages.get(chatId)!.concat(newMessage));

    return of(newMessage);
  }

  getMessagesBy(chatId: string): Observable<Message[]> {
    return of(this.messages.get(chatId) || []);
  }
}
