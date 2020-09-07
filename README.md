# lightstyle

Lightweight scoped CSS injection.

## Example

```js
import { classNames, css, insertStyles } from 'lightstyle'

const { header, main } = classNames();

insertStyles(css`

  ${header} {
    padding: 10px 0;
    font-size: 14px;
    line-heght: 24px;
    font-weight: 600;
  }

  ${main} {
    font-size: 12px;
  }

`);

element.innerHTML = `
  <div class=${header}>Hello Earth</div>
  <div class=${main}>How's the weather today?</div>
`;
```
