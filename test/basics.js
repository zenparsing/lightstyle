import * as assert from 'assert';

import { classNames, css, cssStringSymbol } from '../lightstyle.js';

function normalize(value) {
  return String(value).replace(/(^|\n)\s+/g, '$1');
}

export function testBasics() {
  const { root, header, main } = classNames();

  assert.ok(String(root).startsWith('root'));
  assert.strictEqual(String(root), root.className);
  assert.strictEqual(root[cssStringSymbol], '.' + root.className);
  assert.notStrictEqual(String(classNames().root), String(root));

  assert.strictEqual(normalize(css`
    ${root} {
      display: flex;
    }

    ${header} {
      font-weight: bold;
    }

    ${main} {
      flex: 1 1 auto;
      content: "${'Hello world'}";
    }

    ${css`
      .alert { color: red; }
    `}
  `), normalize(`
    .root-z69zbz {
      display: flex;
    }

    .header-1ut54h1 {
      font-weight: bold;
    }

    .main-o7e7u8 {
      flex: 1 1 auto;
      content: "Hello\\ world";
    }

    .alert { color: red; }
  `));
}

export function testCssStringSymbol() {
  const obj = { [cssStringSymbol]: 'div' }

  assert.strictEqual(normalize(css`
    ${obj} {
      display: none;
    }
  `), normalize(`
    div {
      display: none;
    }
  `));
}
