# lightstyle

Lightweight scoped CSS injection.

## Example

```js
import { classNames, css, insertStyles } from 'lightstyle';

// Let's define some globally unique CSS class names.
const { header, main } = classNames();

// And let's add some CSS rules to the document that
// reference those classes.
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

// And finally, we'll use those classes in some HTML.
document.querySelector('#root').innerHTML = `
  <div class="${header}">Hello Earth</div>
  <div class="${main}">How's the weather today?</div>
`;
```

## API

### `classNames()`

Returns a Javascript `Proxy` object that will return unique `ClassNameSelector` instances for each property access.

```js
import { classNames } from 'lightstyle';

const { a } = classNames();

console.log(a.className);
```

When used in a `css` tag literal, the corresponding class name selector will be inserted:

```js
import { classNames, css } from 'lightstyle';

const { a } = classNames();

console.log(String(css`
  ${a} {
    color: purple;
  }
`));
```

### `css(strings, ...values)`

A template literal tag function that returns `CssTemplateLiteralResult` instances.

```js
const result = css`
  a {
    font-weight: bold;
  }
`;
```

Values inserted into the template literal that have a `cssStringSymbol` property will be replaced with the value of that property. All other values will be escaped.

### `insertStyles(rules)`

Schedules a task to insert the specified set of CSS rules into the document. The `rules` parameter is converted to a string before insertion.

```js
import { css, insertStyles } from 'lightstyle';

insertStyles(css`
  h1 {
    margin: 0;
    padding: 0;
  }
`);
```

### `cssStringSymbol`

A `Symbol` which contains raw CSS text to be inserted into `css` tagged templates.

```js
import { cssStringSymbol, css, insertStyles } from 'lightstyle';

const reset = {
  [cssStringSymbol]: '* { box-sizing: border-box; }'
};

insertStyles(css`
  ${reset}

  a {
    font-weight: bold;
  }
`);
```

### Class: `CssTemplateResult`

An object representing the result of `css` tagged template evaluation.

#### `cssTemplateResult.toString()`

Returns the CSS text of the evaluated `css` tagged template literal.

```js
import { css } from 'lightstyle';

const result = css`h1 { font-weight: bold; }`;

console.log(result.toString());
```

#### `classNameSelector[cssStringSymbol]`

The CSS text of the evaluated `css` tagged template literal.

```js
import { css, cssStringSymbol } from 'lightstyle';

const result = css`h1 { font-weight: bold; }`;

console.log(result[cssStringSymbol]);
```

### Class: `ClassNameSelector`

An object representing a unique CSS class name selector.

#### `classNameSelector.toString()`

Returns the unique CSS class name associated with the object.

```js
import { classNames } from 'lightstyle';

const { root } = classNames();

console.log(root.toString());
```

#### `classNameSelector.className`

The unique CSS class name associated with the object.

```js
import { classNames } from 'lightstyle';

const { root } = classNames();

console.log(root.className);
```

#### `classNameSelector[cssStringSymbol]`

The CSS selector associated with the object.

```js
import { classNames, cssStringSymbol } from 'lightstyle';

const { root } = classNames();

console.log(root[cssStringSymbol]);
```
