import { VNode, DOMElement } from "types";

const createDomElement = (
  vnode: VNode & { type: string }
): HTMLElement | Text => {
  if (typeof vnode === "string") {
    return document.createTextNode(vnode);
  }

  const { type, props } = vnode;
  const domElement = document.createElement(type) as DOMElement;

  for (const propName in props) {
    if (propName.startsWith("on")) {
      const eventName = propName.slice(2).toLowerCase();
      domElement.addEventListener(eventName, props[propName] as EventListener);
    } else if (propName !== "children") {
      domElement[propName] = props[propName];
    }
  }

  if (props.children) {
    props.children
      .map(createDomElement as (vnode: VNode) => HTMLElement | Text)
      .forEach((childDomElement: HTMLElement | Text) =>
        document.body.appendChild(childDomElement)
      );
  }

  return domElement;
};
