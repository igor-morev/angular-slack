import { AuthService, User } from '@angular-slack/auth/data-access';
import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Message, UpdateMessageParams } from './models/message';

import { v4 as uuidv4 } from 'uuid';
import { removeDublicates } from '@angular-slack/utils';
import { UserApiService } from './user-api.service';

@Injectable({
  providedIn: 'root',
})
export class MessageApiService {
  private authService = inject(AuthService);
  private userApiService = inject(UserApiService);

  // fake db
  messages: Map<string, Message[]> = new Map([
    [
      '1',
      [
        {
          id: uuidv4(),
          chatId: '1',
          content: 'What`s up',
          emoji: ['&#x1F602', '&#x1F618', '&#x1F631'],
          createdAt: new Date().toISOString(),
          author: {
            username: 'Benoit enzley',
          },
        },
        {
          id: uuidv4(),
          chatId: '1',
          content: 'Hi, how are u doing?',
          createdAt: new Date().toISOString(),
          author: {
            username: this.authService.userName,
          },
        },
      ] as Message[],
    ],
    [
      '4',
      [
        {
          id: uuidv4(),
          chatId: '4',
          content: 'Hi',
          createdAt: new Date().toISOString(),
          author: {
            username: this.authService.userName,
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
          emoji: [
            '&#x1F606',
            '&#x1F44D',
            '&#x1F60D',
            '&#x1F602',
            '&#x1F618',
            '&#x1F631',
          ],
          author: {
            username: 'Benoit enzley',
          },
          thread: {
            id: 'thread-1',
            chatId: 'thread-1',
            authors: this.userApiService.users.slice(1, 5),
            messagesCount: 4,
          },
        } as Message,
        {
          id: uuidv4(),
          content: '<i>Greetings</i>',
          chatId: 'channel-1',
          createdAt: new Date().toISOString(),
          author: {
            username: 'Beverie Duncklee',
          },
        } as Message,
        {
          id: uuidv4(),
          content: 'What`s up',
          chatId: 'channel-1',
          emoji: ['&#x1F602', '&#x1F618', '&#x1F631'],
          createdAt: new Date().toISOString(),
          author: {
            username: 'Mayor Howarth',
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
          createdAt: new Date().toISOString(),
          author: {
            username: 'Beverie Duncklee',
          },
        } as Message,
        {
          id: uuidv4(),
          content: 'Ok',
          chatId: 'thread-1',
          createdAt: new Date().toISOString(),
          author: {
            username: 'Mayor Howarth',
          },
        } as Message,
        {
          id: uuidv4(),
          content: 'Cool',
          chatId: 'thread-1',
          createdAt: new Date().toISOString(),
          emoji: ['&#x1F606', '&#x1F44D', '&#x1F60D'],
          author: {
            username: 'Nikolaos Olivazzi',
          },
        } as Message,
        {
          id: uuidv4(),
          content: 'Thanks <br> <b>Every one</b>',
          chatId: 'thread-1',
          createdAt: new Date().toISOString(),
          author: {
            username: 'Hube Sambell',
          },
        } as Message,
      ],
    ],
  ]);

  sendMessage(
    chatId: string,
    content: string,
    attachments: File[]
  ): Observable<{
    data: Message;
    messagesCount: number;
    authors: User[];
  }> {
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

    if (this.messages.get(chatId)) {
      this.messages.set(chatId, this.messages.get(chatId)!.concat(newMessage));
    } else {
      this.messages.set(chatId, [newMessage]);
    }

    return of({
      data: newMessage,
      messagesCount: this.messages.get(chatId)!.length,
      authors: removeDublicates(
        this.messages.get(chatId)!.map((message) => message.author)
      ),
    });
  }

  getMessagesBy(chatId: string): Observable<Message[]> {
    return of(this.messages.get(chatId) || []);
  }

  updateMessage(id: string, chatId: string, params: UpdateMessageParams) {
    this.messages.set(
      chatId,
      this.messages.get(chatId)!.map((message) => {
        if (message.id === id) {
          return {
            ...message,
            ...params,
          };
        }

        return message;
      })
    );

    return of(this.messages.get(chatId)!.find((m) => m.id === id)!);
  }
}
