# lightstyle

Lightweight scoped CSS injection.

## Example

```js
import { insertStyles, classNames, css } from 'lightstyle'

export const { header, main } = classNames();

insertStyles(css`

${header} {
  padding: 10px 20px;
  font-size: 14px;
  line-heght: 24px;
  font-weight: 600;
}

${main} {
  font-size: 12px;
}

`)
```
