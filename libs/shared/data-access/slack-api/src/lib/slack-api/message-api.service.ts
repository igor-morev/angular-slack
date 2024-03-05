import { AuthService } from '@angular-slack/auth/data-access';
import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Message } from './models/message';

import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class MessageApiService {
  private authService = inject(AuthService);

  // fake db
  messages: Map<string, Message[]> = new Map([
    [
      '1',
      Array.from(
        { length: 10 },
        (v, k) =>
          ({
            id: uuidv4(),
            chatId: '1',
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
          id: uuidv4(),
          chatId: '4',
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
          id: uuidv4(),
          content: 'Hello',
          chatId: 'channel-1',
          createdAt: new Date().toISOString(),
          author: {
            username: 'Jeff Bezos',
          },
          thread: {
            id: uuidv4(),
            messageId: 'thread-1',
            authors: [
              {
                username: 'Jeff Bezos',
              },
              {
                username: 'Elon Mask',
              },
            ],
            messagesCount: 4,
          },
        } as Message,
        {
          id: uuidv4(),
          content: '<i>Greetings</i>',
          chatId: 'channel-1',

          createdAt: new Date().toISOString(),
          author: {
            username: 'Elon Mask',
          },
        } as Message,
        {
          id: uuidv4(),
          content: 'What`s up',
          chatId: 'channel-1',
          createdAt: new Date().toISOString(),
          author: {
            username: 'Bill Gates',
          },
        } as Message,
      ],
    ],
    [
      'thread-1',
      [
        {
          id: uuidv4(),
          content: 'Hello',
          chatId: 'thread-1',
          createdAt: new Date().toISOString(),
          author: {
            username: 'Jeff Bezos',
          },
        } as Message,
        {
          id: uuidv4(),
          content: 'How are u',
          chatId: 'thread-1',
          createdAt: new Date().toISOString(),
          author: {
            username: 'Elon Mask',
          },
        } as Message,
        {
          id: uuidv4(),
          content: 'Ok',
          chatId: 'thread-1',
          createdAt: new Date().toISOString(),
          author: {
            username: 'Bill Gates',
          },
        } as Message,
        {
          id: uuidv4(),
          content: 'Cool',
          chatId: 'thread-1',
          createdAt: new Date().toISOString(),
          author: {
            username: 'John Carmack',
          },
        } as Message,
        {
          id: uuidv4(),
          content: 'Thanks <br> <b>Every one</b>',
          chatId: 'thread-1',
          createdAt: new Date().toISOString(),
          author: {
            username: 'Steve Jobs',
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
      id: uuidv4(),
      content,
      chatId,
      createdAt: new Date().toISOString(),
      attachments,
      author: {
        username: this.authService.userName,
      },
    } as Message;

    this.messages.set(chatId, this.messages.get(chatId)!.concat(newMessage));

    return of(newMessage);
  }

  getMessagesBy(chatId: string): Observable<Message[]> {
    return of(this.messages.get(chatId) || []);
  }
}
