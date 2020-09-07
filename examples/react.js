import * as React from 'react'

import { ClassNameSelector, cssSelectorSymbol } from '../lightstyle.js'

export { css, insertStyles } from '../lightstyle.js'

export function components(inner = 'div') {
  return new Proxy({}, {
    get(target, prop) { return createComponent(inner, prop) }
  });
}

function createComponent(inner, name) {
  const { className } = new ClassNameSelector(name);

  function LightstyleComponent(props) {
    return React.createElement(inner, {
      ...props,
      className: props.className
        ? className + ' ' + props.className
        : className
    });
  }

  LightstyleComponent[cssSelectorSymbol] = '.' + className;

  return LightstyleComponent;
}
