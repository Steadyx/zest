import { VNode } from "types";

type WritableKeys<T> = {
  [K in keyof T]: IfEquals<
    { [P in K]: T[K] },
    { -readonly [P in K]: T[K] },
    K
  > extends never | undefined
    ? never
    : K;
}[keyof T];

type IfEquals<X, Y, A = X, B = never> = (<T>() => T extends X ? 1 : 2) extends <
  T
>() => T extends Y ? 1 : 2
  ? A
  : B;

const isAssignableProperty = (
  obj: HTMLElement,
  propName: string
): propName is WritableKeys<HTMLElement> => {
  return propName in obj;
};

export const updateElement = (
  parent: HTMLElement | Text,
  newNode: VNode | undefined,
  oldNode: VNode | undefined,
  index = 0
) => {
  if (!oldNode) {
    if (typeof newNode !== "string" && typeof newNode?.type === "string") {
      parent.appendChild(document.createElement(newNode.type));
    }
  } else if (!newNode) {
    parent.removeChild(parent.childNodes[index]);
  } else if (typeof newNode === "string") {
    if (typeof oldNode === "string") {
      if (newNode !== oldNode) {
        parent.textContent = newNode;
      }
    } else {
      parent.replaceChild(
        document.createTextNode(newNode),
        parent.childNodes[index]
      );
    }
  } else if (typeof oldNode === "string" || newNode.type !== oldNode.type) {
    const newElement = document.createElement(newNode.type as string);
    parent.replaceChild(newElement, parent.childNodes[index]);
  } else {
    const newLength = newNode.props.children.length;
    const oldLength = oldNode.props.children.length;

    for (const propName in { ...oldNode.props, ...newNode.props }) {
      if (
        isAssignableProperty(parent.childNodes[index] as HTMLElement, propName)
      ) {
        (parent.childNodes[index] as HTMLElement)[propName] =
          newNode.props[propName];
      }
    }

    for (let i = 0; i < newLength || i < oldLength; i++) {
      updateElement(
        parent.childNodes[index] as HTMLElement,
        newNode.props.children[i],
        oldNode.props.children[i],
        i
      );
    }
  }
};
