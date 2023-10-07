import React, { ReactNode, SVGProps } from "react";

export function createIcon(
  SvgElement: JSX.Element,
): (props: SVGProps<SVGElement>) => ReactNode {
  return function Icon(props) {
    return React.cloneElement(SvgElement, props);
  };
}
