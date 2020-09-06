import * as assert from 'assert';
import { css } from '../lightstyle.js';

function escape(input) {
  return String(css`${input}`);
}

// Tests adapted from https://github.com/mathiasbynens/CSS.escape

assert.equal(escape('\0'), '\uFFFD');
assert.equal(escape('a\0'), 'a\uFFFD');
assert.equal(escape('\0b'), '\uFFFDb');
assert.equal(escape('a\0b'), 'a\uFFFDb');

assert.equal(escape('\uFFFD'), '\uFFFD');
assert.equal(escape('a\uFFFD'), 'a\uFFFD');
assert.equal(escape('\uFFFDb'), '\uFFFDb');
assert.equal(escape('a\uFFFDb'), 'a\uFFFDb');

assert.equal(escape(undefined), '');
assert.equal(escape(null), '');
assert.equal(escape(true), 'true');
assert.equal(escape(false), 'false');
assert.equal(escape(''), '');

assert.equal(escape('\x01\x02\x1E\x1F'), '\\1 \\2 \\1e \\1f ');

assert.equal(escape('0a'), '\\30 a');
assert.equal(escape('1a'), '\\31 a');
assert.equal(escape('2a'), '\\32 a');
assert.equal(escape('3a'), '\\33 a');
assert.equal(escape('4a'), '\\34 a');
assert.equal(escape('5a'), '\\35 a');
assert.equal(escape('6a'), '\\36 a');
assert.equal(escape('7a'), '\\37 a');
assert.equal(escape('8a'), '\\38 a');
assert.equal(escape('9a'), '\\39 a');

assert.equal(escape('a0b'), 'a0b');
assert.equal(escape('a1b'), 'a1b');
assert.equal(escape('a2b'), 'a2b');
assert.equal(escape('a3b'), 'a3b');
assert.equal(escape('a4b'), 'a4b');
assert.equal(escape('a5b'), 'a5b');
assert.equal(escape('a6b'), 'a6b');
assert.equal(escape('a7b'), 'a7b');
assert.equal(escape('a8b'), 'a8b');
assert.equal(escape('a9b'), 'a9b');

assert.equal(escape('-0a'), '-\\30 a');
assert.equal(escape('-1a'), '-\\31 a');
assert.equal(escape('-2a'), '-\\32 a');
assert.equal(escape('-3a'), '-\\33 a');
assert.equal(escape('-4a'), '-\\34 a');
assert.equal(escape('-5a'), '-\\35 a');
assert.equal(escape('-6a'), '-\\36 a');
assert.equal(escape('-7a'), '-\\37 a');
assert.equal(escape('-8a'), '-\\38 a');
assert.equal(escape('-9a'), '-\\39 a');

assert.equal(escape('-'), '\\-');
assert.equal(escape('-a'), '-a');
assert.equal(escape('--'), '--');
assert.equal(escape('--a'), '--a');

assert.equal(escape('\x80\x2D\x5F\xA9'), '\x80\x2D\x5F\xA9');
assert.equal(escape('\x7F\x80\x81\x82\x83\x84\x85\x86\x87\x88\x89\x8A\x8B\x8C\x8D\x8E\x8F\x90\x91\x92\x93\x94\x95\x96\x97\x98\x99\x9A\x9B\x9C\x9D\x9E\x9F'), '\\7f \x80\x81\x82\x83\x84\x85\x86\x87\x88\x89\x8A\x8B\x8C\x8D\x8E\x8F\x90\x91\x92\x93\x94\x95\x96\x97\x98\x99\x9A\x9B\x9C\x9D\x9E\x9F');
assert.equal(escape('\xA0\xA1\xA2'), '\xA0\xA1\xA2');
assert.equal(escape('a0123456789b'), 'a0123456789b');
assert.equal(escape('abcdefghijklmnopqrstuvwxyz'), 'abcdefghijklmnopqrstuvwxyz');
assert.equal(escape('ABCDEFGHIJKLMNOPQRSTUVWXYZ'), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ');

assert.equal(escape('\x20\x21\x78\x79'), '\\ \\!xy');

// astral symbol (U+1D306 TETRAGRAM FOR CENTRE)
assert.equal(escape('\uD834\uDF06'), '\uD834\uDF06');

// lone surrogates
assert.equal(escape('\uDF06'), '\uDF06');
assert.equal(escape('\uD834'), '\uD834');
