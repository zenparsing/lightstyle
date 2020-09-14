import * as React from 'react';

import { ClassNameSelector, cssStringSymbol } from '../lightstyle.js';

export * from '../lightstyle.js';

export function styleComponents(inner = 'div') {
  return new Proxy({}, {
    get(target, prop) { return createComponent(inner, prop) }
  });
}

function createComponent(inner, name) {
  const selector = new ClassNameSelector(name);

  const LightstyleComponent = React.forwardRef((props, ref) => {
    let { className } = selector;
    if (props.className) {
      className += ' ' + props.className;
    }
    return React.createElement(inner, { ...props, ref, className });
  });

  LightstyleComponent[cssStringSymbol] = selector[cssStringSymbol];

  return LightstyleComponent;
}
