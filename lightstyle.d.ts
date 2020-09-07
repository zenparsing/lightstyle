export const cssSelectorSymbol: unique symbol;

export class ClassNameSelector {
  constructor(name: string);

  className: string;
  [cssSelectorSymbol]: string;

  toString(): string
}

export function classNames(): Record<string, ClassNameSelector>;

export function css(callsite: any, ...values: any[]): { toString(): string };

export function insertStyles(rules: any): void;
