import * as basics from './basics.js';
import * as cssEscape from './css-escape.js';
import * as insertion from './insertion.js';

async function testModules(...modules) {
  for (const m of modules) {
    for (const [key, value] of Object.entries(m)) {
      value();
    }
  }
}

testModules(basics, cssEscape, insertion);
