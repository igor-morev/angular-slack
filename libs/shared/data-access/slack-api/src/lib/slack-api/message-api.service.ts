import { AuthService, User } from '@angular-slack/auth/data-access';
import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Message, UpdateMessageParams } from './models/message';

import { v4 as uuidv4 } from 'uuid';
import { removeDublicates } from '@angular-slack/utils';

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
            parentChatId: null,
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
          id: 'thread-1',

          content: 'Hello',
          chatId: 'channel-1',
          createdAt: new Date().toISOString(),
          author: {
            username: 'Jeff Bezos',
          },
          thread: {
            id: 'thread-1',
            chatId: 'thread-1',
            authors: [
              {
                username: 'Elon Mask',
              },
              {
                username: 'John Carmack',
              },
              {
                username: 'Bill Gates',
              },
              {
                username: 'Steve Jobs',
              },
            ],
            messagesCount: 4,
          },
        } as Message,
        {
          id: uuidv4(),
          content: '<i>Greetings</i>',
          chatId: 'channel-1',
          parentChatId: null,
          createdAt: new Date().toISOString(),
          author: {
            username: 'Elon Mask',
          },
        } as Message,
        {
          id: uuidv4(),
          content: 'What`s up',
          chatId: 'channel-1',
          parentChatId: null,
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
          content: 'How are u',
          chatId: 'thread-1',
          parentChatId: 'channel-1',
          createdAt: new Date().toISOString(),
          author: {
            username: 'Elon Mask',
          },
        } as Message,
        {
          id: uuidv4(),
          content: 'Ok',
          chatId: 'thread-1',
          parentChatId: 'channel-1',
          createdAt: new Date().toISOString(),
          author: {
            username: 'Bill Gates',
          },
        } as Message,
        {
          id: uuidv4(),
          content: 'Cool',
          chatId: 'thread-1',
          parentChatId: 'channel-1',
          createdAt: new Date().toISOString(),
          author: {
            username: 'John Carmack',
          },
        } as Message,
        {
          id: uuidv4(),
          content: 'Thanks <br> <b>Every one</b>',
          chatId: 'thread-1',
          parentChatId: 'channel-1',
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
    attachments: File[],
    parentChatId?: string
  ): Observable<{
    data: Message;
    chatCount: number;
    authors: User[];
  }> {
    const newMessage: Message = {
      id: uuidv4(),
      content,
      chatId,
      createdAt: new Date().toISOString(),
      attachments,
      parentChatId,
      author: {
        username: this.authService.userName,
      },
    } as Message;

    if (this.messages.get(chatId)) {
      this.messages.set(chatId, this.messages.get(chatId)!.concat(newMessage));
    } else {
      this.messages.set(chatId, [newMessage]);
    }

    return of({
      data: newMessage,
      chatCount: this.messages.get(chatId)!.length,
      authors: removeDublicates(
        this.messages.get(chatId)!.map((message) => message.author)
      ),
    });
  }

  getMessagesBy(chatId: string): Observable<Message[]> {
    return of(this.messages.get(chatId) || []);
  }

  updateMessage(id: string, chatId: string, data: UpdateMessageParams) {
    this.messages.set(
      chatId,
      this.messages.get(chatId)!.map((message) => {
        if (message.id === id) {
          return {
            ...message,
            ...data,
          };
        }

        return message;
      })
    );

    return of(this.messages.get(chatId)!.find((m) => m.id === id)!);
  }
}
