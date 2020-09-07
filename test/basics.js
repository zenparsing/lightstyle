import * as assert from 'assert';

import { classNames, css } from '../lightstyle.js';

function normalize(value) {
  return String(value).replace(/(^|\n)\s+/g, '$1');
}

{
  const { root, header, main } = classNames();

  assert.ok(String(root).startsWith('root'));
  assert.strictEqual(String(root), root.className);

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
