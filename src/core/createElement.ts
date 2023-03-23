import { VNode, VNodeProps, ComponentType, ElementType } from "types";

const createElement = <P extends VNodeProps>(
  type: ElementType<P>,
  props: P = {} as P,
  ...children: (string | number | VNode)[]
): VNode => {
  const processChildren = (child: string | number | VNode): string | VNode => {
    if (typeof child === "number") {
      return String(child);
    }
    return child;
  };

  if (typeof type === "function") {
    return (type as ComponentType<P>)({
      ...props,
      children: children.flat().map(processChildren),
    });
  }

  return {
    type: type as string,
    props: {
      ...props,
      children: children.flat().map(processChildren),
    },
  };
};

export default createElement;
