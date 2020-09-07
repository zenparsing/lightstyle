import * as assert from 'assert';

import { css } from '../lightstyle.js';

function escape(input) {
  return String(css`${input}`);
}

// Tests adapted from https://github.com/mathiasbynens/CSS.escape

assert.strictEqual(escape('\0'), '\uFFFD');
assert.strictEqual(escape('a\0'), 'a\uFFFD');
assert.strictEqual(escape('\0b'), '\uFFFDb');
assert.strictEqual(escape('a\0b'), 'a\uFFFDb');

assert.strictEqual(escape('\uFFFD'), '\uFFFD');
assert.strictEqual(escape('a\uFFFD'), 'a\uFFFD');
assert.strictEqual(escape('\uFFFDb'), '\uFFFDb');
assert.strictEqual(escape('a\uFFFDb'), 'a\uFFFDb');

assert.strictEqual(escape(undefined), '');
assert.strictEqual(escape(null), '');
assert.strictEqual(escape(true), 'true');
assert.strictEqual(escape(false), 'false');
assert.strictEqual(escape(''), '');

assert.strictEqual(escape('\x01\x02\x1E\x1F'), '\\1 \\2 \\1e \\1f ');

assert.strictEqual(escape('0a'), '\\30 a');
assert.strictEqual(escape('1a'), '\\31 a');
assert.strictEqual(escape('2a'), '\\32 a');
assert.strictEqual(escape('3a'), '\\33 a');
assert.strictEqual(escape('4a'), '\\34 a');
assert.strictEqual(escape('5a'), '\\35 a');
assert.strictEqual(escape('6a'), '\\36 a');
assert.strictEqual(escape('7a'), '\\37 a');
assert.strictEqual(escape('8a'), '\\38 a');
assert.strictEqual(escape('9a'), '\\39 a');

assert.strictEqual(escape('a0b'), 'a0b');
assert.strictEqual(escape('a1b'), 'a1b');
assert.strictEqual(escape('a2b'), 'a2b');
assert.strictEqual(escape('a3b'), 'a3b');
assert.strictEqual(escape('a4b'), 'a4b');
assert.strictEqual(escape('a5b'), 'a5b');
assert.strictEqual(escape('a6b'), 'a6b');
assert.strictEqual(escape('a7b'), 'a7b');
assert.strictEqual(escape('a8b'), 'a8b');
assert.strictEqual(escape('a9b'), 'a9b');

assert.strictEqual(escape('-0a'), '-\\30 a');
assert.strictEqual(escape('-1a'), '-\\31 a');
assert.strictEqual(escape('-2a'), '-\\32 a');
assert.strictEqual(escape('-3a'), '-\\33 a');
assert.strictEqual(escape('-4a'), '-\\34 a');
assert.strictEqual(escape('-5a'), '-\\35 a');
assert.strictEqual(escape('-6a'), '-\\36 a');
assert.strictEqual(escape('-7a'), '-\\37 a');
assert.strictEqual(escape('-8a'), '-\\38 a');
assert.strictEqual(escape('-9a'), '-\\39 a');

assert.strictEqual(escape('-'), '\\-');
assert.strictEqual(escape('-a'), '-a');
assert.strictEqual(escape('--'), '--');
assert.strictEqual(escape('--a'), '--a');

assert.strictEqual(escape('\x80\x2D\x5F\xA9'), '\x80\x2D\x5F\xA9');
assert.strictEqual(escape('\x7F\x80\x81\x82\x83\x84\x85\x86\x87\x88\x89\x8A\x8B\x8C\x8D\x8E\x8F\x90\x91\x92\x93\x94\x95\x96\x97\x98\x99\x9A\x9B\x9C\x9D\x9E\x9F'), '\\7f \x80\x81\x82\x83\x84\x85\x86\x87\x88\x89\x8A\x8B\x8C\x8D\x8E\x8F\x90\x91\x92\x93\x94\x95\x96\x97\x98\x99\x9A\x9B\x9C\x9D\x9E\x9F');
assert.strictEqual(escape('\xA0\xA1\xA2'), '\xA0\xA1\xA2');
assert.strictEqual(escape('a0123456789b'), 'a0123456789b');
assert.strictEqual(escape('abcdefghijklmnopqrstuvwxyz'), 'abcdefghijklmnopqrstuvwxyz');
assert.strictEqual(escape('ABCDEFGHIJKLMNOPQRSTUVWXYZ'), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ');

assert.strictEqual(escape('\x20\x21\x78\x79'), '\\ \\!xy');

// astral symbol (U+1D306 TETRAGRAM FOR CENTRE)
assert.strictEqual(escape('\uD834\uDF06'), '\uD834\uDF06');

// lone surrogates
assert.strictEqual(escape('\uDF06'), '\uDF06');
assert.strictEqual(escape('\uD834'), '\uD834');
