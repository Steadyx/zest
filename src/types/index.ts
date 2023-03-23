export interface Action {
  type: string;
  payload?: any;
}

export interface Reducer<S> {
  (state: S, action: Action): S;
}

export interface Store<S> {
  getState: () => S;
  subscribe: (listener: () => void) => () => void;
  dispatch: (action: Action) => void;
}
