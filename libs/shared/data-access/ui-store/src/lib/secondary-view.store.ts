import { ThreadChatViewComponent } from '@angular-slack/thread-chat-view';
import { Type } from '@angular/core';
import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';

type ViewType = 'thread' | 'profile';

type ThreadViewData = {
  chatId: string;
  title: string;
};

type SecondaryViewState = {
  activeView: {
    type: ViewType;
    component: Type<any>;
    data: ThreadViewData;
  } | null;
};

const viewInitialState: SecondaryViewState = {
  activeView: null,
};

export const SecondaryViewStore = signalStore(
  { providedIn: 'root' },
  withState<SecondaryViewState>(viewInitialState),
  withMethods((store) => ({
    open: <T>(type: ViewType, component: Type<any>, data: ThreadViewData) => {
      patchState(store, {
        activeView: {
          type,
          component,
          data,
        },
      });
    },
    close: () => {
      patchState(store, {
        activeView: null,
      });
    },
  }))
);
