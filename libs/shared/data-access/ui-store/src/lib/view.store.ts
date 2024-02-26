import { ThreadChatViewComponent } from '@angular-slack/thread-chat-view';
import { Type } from '@angular/core';
import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';

type ViewType = 'thread' | 'profile';

type ThreadViewData = {
  chatId: string;
  title: string;
};

export type ViewState = {
  activeView: {
    type: ViewType;
    component: Type<any>;
    data: ThreadViewData;
  } | null;
};

const viewInitialState: ViewState = {
  activeView: null,
};

export const ViewStore = signalStore(
  { providedIn: 'root' },
  withState<ViewState>(viewInitialState),
  withMethods((store) => ({
    openView: <T>(
      type: ViewType,
      component: Type<any>,
      data: ThreadViewData
    ) => {
      patchState(store, {
        activeView: {
          type,
          component,
          data,
        },
      });
    },
    closeView: () => {
      patchState(store, {
        activeView: null,
      });
    },
  }))
);
