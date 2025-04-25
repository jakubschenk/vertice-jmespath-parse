type ExpressionType =
  | "literal"
  | "identifier"
  | "func_exp"
  | "compare_exp"
  | "or_exp"
  | "and_exp"
  | "not_exp"
  | "sub_exp"
  | "pipe_exp"
  | "index_exp"
  | "optional_index"
  | "slice"
  | "multi_select_list"
  | "multi_select_hash"
  | "wildcard"
  | "current"
  | "func_arg"
  | "expr_type"
  | "paren_exp"
  | "keyval_exp"
  | "quoted_string"
  | "unquoted_string"
  | "raw_string";

// Base types for expressions
type BaseExpression = {
  type: ExpressionType;
  pos?: number; // Position in original input
};

// Literal value types
type LiteralValue = string;

type LiteralExpression = BaseExpression & {
  type: "literal";
  value: LiteralValue;
};

// Identifier expression
type IdentifierExpression = BaseExpression & {
  type: "identifier";
  name: string;
};

// Function expressions
type FunctionExpression = BaseExpression & {
  type: "func_exp";
  identifier: LiteralExpression;
  args: Expression[];
};

// Comparison operators
type ComparisonOperator = "==" | "!=" | ">" | ">=" | "<" | "<=";

type ComparisonExpression = BaseExpression & {
  type: "compare_exp";
  comparator: ComparisonOperator;
  lhexp: Expression;
  rhexp: Expression;
};

// Logical operators
type LogicalExpression = BaseExpression & {
  type: "or_exp" | "and_exp";
  lhexp: Expression;
  rhexp: Expression;
};

// Not expression
type NotExpression = BaseExpression & {
  type: "not_exp";
  exp: Expression;
};

// Sub-expression (dot notation)
type SubExpression = BaseExpression & {
  type: "sub_exp";
  exp: Expression;
  val: Expression;
};

// Pipe expression
type PipeExpression = BaseExpression & {
  type: "pipe_exp";
  lhexp: Expression;
  rhexp: Expression;
};

// Index expressions
type IndexExpression = BaseExpression & {
  type: "index_exp";
  exp: Expression;
  child: Expression | null;
};

// Optional index with filter
type OptionalIndexExpression = BaseExpression & {
  type: "optional_index";
  exp: Expression;
};

// Slice expression for arrays
type SliceExpression = BaseExpression & {
  type: "slice";
  start?: number;
  stop?: number;
  step?: number;
};

// Multi-select expressions
type MultiSelectList = BaseExpression & {
  type: "multi_select_list";
  elements: Expression[];
};

type MultiSelectHash = BaseExpression & {
  type: "multi_select_hash";
  pairs: Array<{
    key: string;
    value: Expression;
  }>;
};

// Wildcard expression
type WildcardExpression = BaseExpression & {
  type: "wildcard";
};

// Current node reference
type CurrentNodeExpression = BaseExpression & {
  type: "current";
};

type FunctionArgument = BaseExpression & {
  type: "func_arg";
  exp: Expression;
};

type ExprType = BaseExpression & {
  type: "expr_type";
  expr: Expression;
};

type ParenExpression = BaseExpression & {
  type: "paren_exp";
  exp: Expression;
};

type KeyValExpression = BaseExpression & {
  type: "keyval_exp";
  key: LiteralExpression;
  val: Expression;
};

type Expression =
  | BaseExpression
  | LiteralExpression
  | IdentifierExpression
  | FunctionExpression
  | ComparisonExpression
  | LogicalExpression
  | NotExpression
  | SubExpression
  | PipeExpression
  | IndexExpression
  | OptionalIndexExpression
  | SliceExpression
  | MultiSelectList
  | MultiSelectHash
  | WildcardExpression
  | CurrentNodeExpression;

// Post-processing callback types
type PostProcessorCallback = (data: Expression[]) => Expression;

type PostProcessorFunction = (data: Expression[], pos?: number) => Expression;

// Helper function to add position info
type PositionWrapper = (
  callback: PostProcessorCallback,
) => PostProcessorFunction;

type NumberExpression = Expression & {
  type: "number";
  value: number;
};

type RawStringExpression = Expression & {
  type: "raw_string";
  value: string;
};

type QuotedStringExpression = Expression & {
  type: "quoted_string";
  value: string;
};

type UnquotedStringExpression = Expression & {
  type: "unquoted_string";
  value: string;
};

// Union type of all possible expressions
type JMESPathExpression =
  | LiteralExpression
  | IdentifierExpression
  | FunctionExpression
  | ComparisonExpression
  | LogicalExpression
  | NotExpression
  | SubExpression
  | PipeExpression
  | IndexExpression
  | OptionalIndexExpression
  | SliceExpression
  | MultiSelectList
  | MultiSelectHash
  | WildcardExpression
  | CurrentNodeExpression;

export type {
  Expression,
  LiteralExpression,
  IdentifierExpression,
  FunctionExpression,
  ComparisonExpression,
  LogicalExpression,
  NotExpression,
  SubExpression,
  PipeExpression,
  IndexExpression,
  OptionalIndexExpression,
  SliceExpression,
  MultiSelectList,
  MultiSelectHash,
  WildcardExpression,
  CurrentNodeExpression,
  JMESPathExpression,
  PostProcessorCallback,
  PostProcessorFunction,
  PositionWrapper,
  FunctionArgument,
  ExprType,
  ParenExpression,
  KeyValExpression,
  NumberExpression,
  RawStringExpression,
  QuotedStringExpression,
  UnquotedStringExpression,
};
