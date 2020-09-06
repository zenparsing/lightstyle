import * as React from 'react'

import { classNames } from './lightstyle.js'

export { css, insertStyles } from './index.js'

export function components(inner = 'div') {
  return new Proxy({}, {
    get(target, prop) { return createComponent(inner, prop) }
  });
}

function createComponent(inner, name) {
  const className = String(classNames()[name]);

  function LightstyleComponent(props) {
    return React.createElement(inner, {
      ...props,
      className: props.className
        ? className + ' ' + props.className
        : className
    });
  }

  LightstyleComponent.classList = [className];

  return CssComponent;
}
