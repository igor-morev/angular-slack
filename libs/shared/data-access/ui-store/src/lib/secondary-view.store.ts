import { Message } from '@angular-slack/slack-api';
import { Type } from '@angular/core';
import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';

type ViewType = 'thread' | 'profile';

type ThreadViewData = {
  message: Message;
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
