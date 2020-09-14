export const cssStringSymbol: unique symbol;

export class ClassNameSelector {
  constructor(name: string);
  className: string;
  [cssStringSymbol]: string;
  toString(): string
}

export function classNames(): Record<string, ClassNameSelector>;

export class CssTemplateResult {
  [cssStringSymbol]: string;
  toString(): string;
}

export function css(callsite: any, ...values: any[]): CssTemplateResult;

export function insertStyles(rules: any): void;
