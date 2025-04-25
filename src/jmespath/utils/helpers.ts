import {
  Expression,
  IdentifierExpression,
  UnquotedStringExpression,
  QuotedStringExpression,
  WildcardExpression,
  ComparisonExpression,
  NotExpression,
  LogicalExpression,
  SubExpression,
  FunctionExpression,
  PipeExpression,
  LiteralExpression,
  IndexExpression,
  OptionalIndexExpression,
} from "../grammar/types";

const isFunctionExpression = (
  expression?: Expression,
): expression is FunctionExpression => {
  return expression?.type === "func_exp";
};

const isIndexExpression = (
  expression?: Expression,
): expression is IndexExpression => {
  return expression?.type === "index_exp";
};

const isOptionalIndexExpression = (
  expression?: Expression,
): expression is OptionalIndexExpression => {
  return expression?.type === "optional_index";
};

const isSubExpression = (
  expression?: Expression,
): expression is SubExpression => {
  return expression?.type === "sub_exp";
};

const isPipeExpression = (
  expression?: Expression,
): expression is PipeExpression => {
  return expression?.type === "pipe_exp";
};

const isLogicalExpression = (
  expression?: Expression,
): expression is LogicalExpression => {
  return expression?.type === "and_exp" || expression?.type === "or_exp";
};

const isComparisonExpression = (
  expression?: Expression,
): expression is ComparisonExpression => {
  return expression?.type === "compare_exp";
};

const isNotExpression = (
  expression?: Expression,
): expression is NotExpression => {
  return expression?.type === "not_exp";
};

const isWildcardExpression = (
  expression?: Expression,
): expression is WildcardExpression => {
  return expression?.type === "wildcard";
};

const isQuotedStringExpression = (
  expression?: Expression,
): expression is QuotedStringExpression => {
  return expression?.type === "quoted_string";
};

const isUnquotedStringExpression = (
  expression?: Expression,
): expression is UnquotedStringExpression => {
  return expression?.type === "unquoted_string";
};

const isIdentifierExpression = (
  expression?: Expression,
): expression is IdentifierExpression => {
  return expression?.type === "identifier";
};

const isLiteralExpression = (
  expression?: Expression,
): expression is LiteralExpression => {
  return (
    isQuotedStringExpression(expression) ||
    isUnquotedStringExpression(expression)
  );
};

export {
  isFunctionExpression,
  isIndexExpression,
  isSubExpression,
  isPipeExpression,
  isLogicalExpression,
  isComparisonExpression,
  isNotExpression,
  isWildcardExpression,
  isQuotedStringExpression,
  isUnquotedStringExpression,
  isIdentifierExpression,
  isLiteralExpression,
  isOptionalIndexExpression,
};
