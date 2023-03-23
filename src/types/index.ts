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

export type VNode = {
  type: string | Function;
  props: {
    [key: string]: any;
    children: VNode[];
  };
};

export type DOMElement = HTMLElement & {
  [key: string]: unknown;
};

export type VNodeProps = {
  [key: string]: any;
  children?: VNode[];
};

export type ComponentType<P = {}> = (props: P) => VNode;
export type ElementType<P = {}> = string | ComponentType<P>;
