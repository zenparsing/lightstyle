import * as React from 'react'

import { ClassNameSelector, cssStringSymbol } from '../lightstyle.js'

export * from '../lightstyle.js'

export function styleComponents(inner = 'div') {
  return new Proxy({}, {
    get(target, prop) { return createComponent(inner, prop) }
  });
}

function createComponent(inner, name) {
  const selector = new ClassNameSelector(name);

  function LightstyleComponent(props) {
    return React.createElement(inner, {
      ...props,
      className: props.className
        ? selector.className + ' ' + props.className
        : selector.className
    });
  }

  LightstyleComponent[cssStringSymbol] = selector[cssStringSymbol];

  return LightstyleComponent;
}
