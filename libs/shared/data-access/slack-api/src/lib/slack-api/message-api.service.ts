import { Injectable } from '@angular/core';
import { Message } from './models/message';

@Injectable({
  providedIn: 'root',
})
export class MessageApiService {
  sendMessageContact(chatId: string): Message {
    console.log(chatId);

    return {
      id: `${+new Date()}`,
      content: 'Hi, there',
      updatedAt: new Date().toISOString(),
      author: {
        username: 'John Frank',
      },
    } as Message;
  }

  getMessages(): Message[] {
    return [];
  }
}
