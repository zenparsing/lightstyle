export const cssSelectorSymbol: unique symbol;

export class ClassNameSelector {
  className: string;
  [cssSelectorSymbol]: string;

  contructor(name: string): ClassNameSelector;
  toString(): string
}

export function classNames(): Record<string, ClassNameSelector>;

export function css(callsite: any, ...values: any[]): { toString(): string };

export function insertStyles(rules: any): void;
