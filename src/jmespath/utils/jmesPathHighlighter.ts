import { Expression, FunctionArgument } from "../grammar/types";
import {
  isComparisonExpression,
  isFunctionExpression,
  isIndexExpression,
  isLogicalExpression,
  isNotExpression,
  isOptionalIndexExpression,
  isPipeExpression,
  isQuotedStringExpression,
  isSubExpression,
  isUnquotedStringExpression,
} from "./helpers";

type Token = {
  char: string;
  pos: number;
  variant: "none" | "function" | "variable" | "quoted" | "unquoted";
};

const parseExpressionToElements = (
  input: string,
  expression: Expression,
  toks?: Token[],
): Token[] => {
  const tokens: Token[] =
    toks ||
    input
      .split("")
      .map((char) => ({ char, pos: input.indexOf(char), variant: "none" }));

  if (isLogicalExpression(expression)) {
    parseExpressionToElements(input, expression.lhexp, tokens);
    parseExpressionToElements(input, expression.rhexp, tokens);
  }

  if (isComparisonExpression(expression)) {
    parseExpressionToElements(input, expression.lhexp, tokens);
    parseExpressionToElements(input, expression.rhexp, tokens);
  }

  if (isNotExpression(expression)) {
    parseExpressionToElements(input, expression.exp, tokens);
  }

  if (isSubExpression(expression)) {
    parseExpressionToElements(input, expression.exp, tokens);
    parseExpressionToElements(input, expression.val, tokens);
  }

  if (isPipeExpression(expression)) {
    parseExpressionToElements(input, expression.lhexp, tokens);
    parseExpressionToElements(input, expression.rhexp, tokens);
  }

  if (isIndexExpression(expression)) {
    parseExpressionToElements(input, expression.exp, tokens);
    if (expression.child) {
      parseExpressionToElements(input, expression.child, tokens);
    }
  }

  if (isOptionalIndexExpression(expression)) {
    parseExpressionToElements(input, expression.exp, tokens);
  }

  if (isFunctionExpression(expression)) {
    const identifier = expression.identifier;
    for (
      let i = identifier.pos!;
      i < identifier.pos! + identifier.value.length;
      i++
    ) {
      tokens[i].variant = "function";
    }

    const args = expression.args as FunctionArgument[];
    const argsAreEmpty = args.every(
      (arg) => arg === null || typeof arg === "string",
    );

    if (!argsAreEmpty) {
      args.forEach((arg) => {
        const argExp = arg.exp;

        parseExpressionToElements(input, argExp, tokens);
      });
    }
  }

  if (isUnquotedStringExpression(expression)) {
    for (
      let i = expression.pos!;
      i < expression.pos! + expression.value!.length;
      i++
    ) {
      tokens[i].variant = "variable";
    }
  }

  if (isQuotedStringExpression(expression)) {
    const start = expression.pos!;

    for (let i = start; i < start + expression.value!.length + 2; i++) {
      tokens[i].variant = "quoted";
    }
  }

  return tokens;
};

export const highlightJmespath = (
  input?: string,
  expression?: Expression | [],
): Token[] | null => {
  if (!input || !expression || Array.isArray(expression)) {
    return null;
  }

  const tokens = parseExpressionToElements(input, expression as Expression);

  return tokens;
};
