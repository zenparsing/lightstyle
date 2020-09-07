function hashString(input) {
  let h = 5381;
  for (let i = 0; i < input.length; i++) {
    h = (h * 33) ^ input.charCodeAt(i);
  }
  return h >>> 0;
}

let nameCount = 1;

function uniqueName(name) {
  const hash = hashString(`${name}-${nameCount}`);
  nameCount = (nameCount + 1) >>> 0;
  const id = hash.toString(36).padStart(5, '0');
  return `${name}-${id}`;
}

export const cssStringSymbol = Symbol('cssString');

export class ClassNameSelector {
  constructor(name) {
    this.className = uniqueName(name);
    this[cssStringSymbol] = '.' + cssEscape(this.className);
  }

  toString() {
    return this.className;
  }
}

const classNameGenerator = new Proxy({}, {
  get(target, prop) { return new ClassNameSelector(prop) }
});

export function classNames() {
  return classNameGenerator;
}

// CSS.escape polyfill adapted from https://github.com/mathiasbynens/CSS.escape
function cssEscape(value) {
  value = String(value);
  let result = '';

  const first = value.charCodeAt(0);
  for (let i = 0; i < value.length; ++i) {
    const charCode = value.charCodeAt(i);
    if (charCode === 0x00) {
      result += '\uFFFD';
    } else if (
      charCode >= 0x01 && charCode <= 0x1F ||
      charCode === 0x7F ||
      charCode >= 0x30 && charCode <= 0x39 && (
        i === 0 || i === 1 && first === 0x2D
      )
    ) {
      result += '\\' + charCode.toString(16) + ' ';
    } else if (i == 0 && value.length == 1 && charCode == 0x2D) {
      result += '\\' + value[i];
    } else if (
      charCode >= 0x80 ||
      charCode == 0x2D ||
      charCode == 0x5F ||
      charCode >= 0x30 && charCode <= 0x39 ||
      charCode >= 0x41 && charCode <= 0x5A ||
      charCode >= 0x61 && charCode <= 0x7A
    ) {
      result += value[i];
    } else {
      result += '\\' + value[i];
    }
  }

  return result;
}

if (typeof CSS === 'object' && typeof CSS.escape === 'function') {
  cssEscape = CSS.escape;
}

class CssTemplateResult {
  constructor(rules) { this[cssStringSymbol] = rules }
  toString() { return this[cssStringSymbol] }
}

export function css(callsite, ...values) {
  let rules = '';

  let i = 0;
  for (const part of callsite.raw) {
    rules += part;
    const value = values[i++];
    if (value != null) {
      rules += value[cssStringSymbol] || cssEscape(value);
    }
  }

  return new CssTemplateResult(rules);
}

let pendingCSS = '';

export function insertStyles(rules) {
  const scheduled = pendingCSS !== '';

  pendingCSS += String(rules);

  if (!scheduled) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', inject);
    } else {
      Promise.resolve().then(inject);
    }
  }
}

function inject() {
  if (!pendingCSS) {
    return;
  }

  const element = document.createElement('style');
  element.append(pendingCSS);
  pendingCSS = '';

  const root = document.documentElement;
  const parent = root.firstElementChild || root;
  parent.appendChild(element);
}
