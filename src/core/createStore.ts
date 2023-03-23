import { Action, Reducer, Store } from "types";

export const createStore = <S>(
  reducer: Reducer<S>,
  initialState: S
): Store<S> => {
  let state = initialState;
  const listeners: (() => void)[] = [];

  const getState = () => state;

  const subscribe = (listener: () => void) => {
    listeners.push(listener);

    return () => {
      const index = listeners.indexOf(listener);
      listeners.splice(index, 1);
    };
  };

  const dispatch = (action: Action) => {
    state = reducer(state, action);
    listeners.forEach((listener) => listener());
  };

  return { getState, subscribe, dispatch };
};
