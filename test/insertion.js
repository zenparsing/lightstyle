import * as assert from 'assert';

import { css, insertStyles } from '../lightstyle.js';

const $children = Symbol();
const $listeners = Symbol();

async function ticks(ticks) {
  for (let i = 0; i < ticks; ++i) {
    await null;
  }
}

function makeFakeElement(tagName) {
  return {
    tagName,
    [$children]: [],
    append(child) { this[$children].push(child) }
  };
}

function fakeDocument() {
  return global.document = {
    [$listeners]: [],
    readyState: 'loading',
    documentElement: {
      firstElementChild: makeFakeElement('head')
    },
    createElement(tagName) {
      return makeFakeElement(tagName);
    },
    addEventListener(name, listener) {
      this[$listeners].push({ name, listener });
    }
  };
}

export async function testInsertion() {
  fakeDocument();
  insertStyles(css` a { color: purple; } `);
  const head = document.documentElement.firstElementChild;
  assert.strictEqual(head[$children].length, 0);

  await ticks(2);
  insertStyles(css` strong { font-weight: 600; } `);
  await ticks(2);
  assert.strictEqual(head[$children].length, 0);
  assert.strictEqual(document[$listeners].length, 1);
  assert.strictEqual(document[$listeners][0].name, 'DOMContentLoaded');

  document[$listeners][0].listener();
  assert.strictEqual(head[$children].length, 1);

  let child = head[$children][0];
  assert.strictEqual(child.tagName, 'style');
  assert.strictEqual(
    child[$children][0],
    ' a { color: purple; }  strong { font-weight: 600; } '
  );

  document.readyState = 'loaded';
  insertStyles(css` button { border-radius: 5px; } `);
  await ticks(2);
  assert.strictEqual(head[$children].length, 2);

  child = head[$children][1];
  assert.strictEqual(child.tagName, 'style');
  assert.strictEqual(child[$children][0], ' button { border-radius: 5px; } ');
}
