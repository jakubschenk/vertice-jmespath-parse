import * as Types from './types';
/* eslint-disable */
// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
// Bypasses TS6133. Allow declared but unused functions.
// @ts-ignore
function id(d: any[]): any { return d[0]; }

const position: Types.PositionWrapper = (callback) => {
  return (data: Types.Expression[], pos?: number) => ({
    ...callback(data),
    pos,
  });
};

interface NearleyToken {
  value: any;
  [key: string]: any;
};

interface NearleyLexer {
  reset: (chunk: string, info: any) => void;
  next: () => NearleyToken | undefined;
  save: () => any;
  formatError: (token: never) => string;
  has: (tokenType: string) => boolean;
};

interface NearleyRule {
  name: string;
  symbols: NearleySymbol[];
  postprocess?: (d: any[], loc?: number, reject?: {}) => any;
};

type NearleySymbol = string | { literal: any } | { test: (token: any) => boolean };

interface Grammar {
  Lexer: NearleyLexer | undefined;
  ParserRules: NearleyRule[];
  ParserStart: string;
};

const grammar: Grammar = {
  Lexer: undefined,
  ParserRules: [
    {"name": "unsigned_int$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "unsigned_int$ebnf$1", "symbols": ["unsigned_int$ebnf$1", /[0-9]/], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "unsigned_int", "symbols": ["unsigned_int$ebnf$1"], "postprocess": 
        function(d) {
            return parseInt(d[0].join(""));
        }
        },
    {"name": "int$ebnf$1$subexpression$1", "symbols": [{"literal":"-"}]},
    {"name": "int$ebnf$1$subexpression$1", "symbols": [{"literal":"+"}]},
    {"name": "int$ebnf$1", "symbols": ["int$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "int$ebnf$1", "symbols": [], "postprocess": () => null},
    {"name": "int$ebnf$2", "symbols": [/[0-9]/]},
    {"name": "int$ebnf$2", "symbols": ["int$ebnf$2", /[0-9]/], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "int", "symbols": ["int$ebnf$1", "int$ebnf$2"], "postprocess": 
        function(d) {
            if (d[0]) {
                return parseInt(d[0][0]+d[1].join(""));
            } else {
                return parseInt(d[1].join(""));
            }
        }
        },
    {"name": "unsigned_decimal$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "unsigned_decimal$ebnf$1", "symbols": ["unsigned_decimal$ebnf$1", /[0-9]/], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "unsigned_decimal$ebnf$2$subexpression$1$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "unsigned_decimal$ebnf$2$subexpression$1$ebnf$1", "symbols": ["unsigned_decimal$ebnf$2$subexpression$1$ebnf$1", /[0-9]/], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "unsigned_decimal$ebnf$2$subexpression$1", "symbols": [{"literal":"."}, "unsigned_decimal$ebnf$2$subexpression$1$ebnf$1"]},
    {"name": "unsigned_decimal$ebnf$2", "symbols": ["unsigned_decimal$ebnf$2$subexpression$1"], "postprocess": id},
    {"name": "unsigned_decimal$ebnf$2", "symbols": [], "postprocess": () => null},
    {"name": "unsigned_decimal", "symbols": ["unsigned_decimal$ebnf$1", "unsigned_decimal$ebnf$2"], "postprocess": 
        function(d) {
            return parseFloat(
                d[0].join("") +
                (d[1] ? "."+d[1][1].join("") : "")
            );
        }
        },
    {"name": "decimal$ebnf$1", "symbols": [{"literal":"-"}], "postprocess": id},
    {"name": "decimal$ebnf$1", "symbols": [], "postprocess": () => null},
    {"name": "decimal$ebnf$2", "symbols": [/[0-9]/]},
    {"name": "decimal$ebnf$2", "symbols": ["decimal$ebnf$2", /[0-9]/], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "decimal$ebnf$3$subexpression$1$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "decimal$ebnf$3$subexpression$1$ebnf$1", "symbols": ["decimal$ebnf$3$subexpression$1$ebnf$1", /[0-9]/], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "decimal$ebnf$3$subexpression$1", "symbols": [{"literal":"."}, "decimal$ebnf$3$subexpression$1$ebnf$1"]},
    {"name": "decimal$ebnf$3", "symbols": ["decimal$ebnf$3$subexpression$1"], "postprocess": id},
    {"name": "decimal$ebnf$3", "symbols": [], "postprocess": () => null},
    {"name": "decimal", "symbols": ["decimal$ebnf$1", "decimal$ebnf$2", "decimal$ebnf$3"], "postprocess": 
        function(d) {
            return parseFloat(
                (d[0] || "") +
                d[1].join("") +
                (d[2] ? "."+d[2][1].join("") : "")
            );
        }
        },
    {"name": "percentage", "symbols": ["decimal", {"literal":"%"}], "postprocess": 
        function(d) {
            return d[0]/100;
        }
        },
    {"name": "jsonfloat$ebnf$1", "symbols": [{"literal":"-"}], "postprocess": id},
    {"name": "jsonfloat$ebnf$1", "symbols": [], "postprocess": () => null},
    {"name": "jsonfloat$ebnf$2", "symbols": [/[0-9]/]},
    {"name": "jsonfloat$ebnf$2", "symbols": ["jsonfloat$ebnf$2", /[0-9]/], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "jsonfloat$ebnf$3$subexpression$1$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "jsonfloat$ebnf$3$subexpression$1$ebnf$1", "symbols": ["jsonfloat$ebnf$3$subexpression$1$ebnf$1", /[0-9]/], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "jsonfloat$ebnf$3$subexpression$1", "symbols": [{"literal":"."}, "jsonfloat$ebnf$3$subexpression$1$ebnf$1"]},
    {"name": "jsonfloat$ebnf$3", "symbols": ["jsonfloat$ebnf$3$subexpression$1"], "postprocess": id},
    {"name": "jsonfloat$ebnf$3", "symbols": [], "postprocess": () => null},
    {"name": "jsonfloat$ebnf$4$subexpression$1$ebnf$1", "symbols": [/[+-]/], "postprocess": id},
    {"name": "jsonfloat$ebnf$4$subexpression$1$ebnf$1", "symbols": [], "postprocess": () => null},
    {"name": "jsonfloat$ebnf$4$subexpression$1$ebnf$2", "symbols": [/[0-9]/]},
    {"name": "jsonfloat$ebnf$4$subexpression$1$ebnf$2", "symbols": ["jsonfloat$ebnf$4$subexpression$1$ebnf$2", /[0-9]/], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "jsonfloat$ebnf$4$subexpression$1", "symbols": [/[eE]/, "jsonfloat$ebnf$4$subexpression$1$ebnf$1", "jsonfloat$ebnf$4$subexpression$1$ebnf$2"]},
    {"name": "jsonfloat$ebnf$4", "symbols": ["jsonfloat$ebnf$4$subexpression$1"], "postprocess": id},
    {"name": "jsonfloat$ebnf$4", "symbols": [], "postprocess": () => null},
    {"name": "jsonfloat", "symbols": ["jsonfloat$ebnf$1", "jsonfloat$ebnf$2", "jsonfloat$ebnf$3", "jsonfloat$ebnf$4"], "postprocess": 
        function(d) {
            return parseFloat(
                (d[0] || "") +
                d[1].join("") +
                (d[2] ? "."+d[2][1].join("") : "") +
                (d[3] ? "e" + (d[3][1] || "+") + d[3][2].join("") : "")
            );
        }
        },
    {"name": "dqstring$ebnf$1", "symbols": []},
    {"name": "dqstring$ebnf$1", "symbols": ["dqstring$ebnf$1", "dstrchar"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "dqstring", "symbols": [{"literal":"\""}, "dqstring$ebnf$1", {"literal":"\""}], "postprocess": function(d) {return d[1].join(""); }},
    {"name": "sqstring$ebnf$1", "symbols": []},
    {"name": "sqstring$ebnf$1", "symbols": ["sqstring$ebnf$1", "sstrchar"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "sqstring", "symbols": [{"literal":"'"}, "sqstring$ebnf$1", {"literal":"'"}], "postprocess": function(d) {return d[1].join(""); }},
    {"name": "btstring$ebnf$1", "symbols": []},
    {"name": "btstring$ebnf$1", "symbols": ["btstring$ebnf$1", /[^`]/], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "btstring", "symbols": [{"literal":"`"}, "btstring$ebnf$1", {"literal":"`"}], "postprocess": function(d) {return d[1].join(""); }},
    {"name": "dstrchar", "symbols": [/[^\\"\n]/], "postprocess": id},
    {"name": "dstrchar", "symbols": [{"literal":"\\"}, "strescape"], "postprocess": 
        function(d) {
            return JSON.parse("\""+d.join("")+"\"");
        }
        },
    {"name": "sstrchar", "symbols": [/[^\\'\n]/], "postprocess": id},
    {"name": "sstrchar", "symbols": [{"literal":"\\"}, "strescape"], "postprocess": function(d) { return JSON.parse("\""+d.join("")+"\""); }},
    {"name": "sstrchar$string$1", "symbols": [{"literal":"\\"}, {"literal":"'"}], "postprocess": (d) => d.join('')},
    {"name": "sstrchar", "symbols": ["sstrchar$string$1"], "postprocess": function(d) {return "'"; }},
    {"name": "strescape", "symbols": [/["\\/bfnrt]/], "postprocess": id},
    {"name": "strescape", "symbols": [{"literal":"u"}, /[a-fA-F0-9]/, /[a-fA-F0-9]/, /[a-fA-F0-9]/, /[a-fA-F0-9]/], "postprocess": 
        function(d) {
            return d.join("");
        }
        },
    {"name": "_$ebnf$1", "symbols": []},
    {"name": "_$ebnf$1", "symbols": ["_$ebnf$1", "wschar"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "_", "symbols": ["_$ebnf$1"], "postprocess": function(d) {return null;}},
    {"name": "__$ebnf$1", "symbols": ["wschar"]},
    {"name": "__$ebnf$1", "symbols": ["__$ebnf$1", "wschar"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "__", "symbols": ["__$ebnf$1"], "postprocess": function(d) {return null;}},
    {"name": "wschar", "symbols": [/[ \t\n\v\f]/], "postprocess": id},
    {"name": "main", "symbols": ["_", "expression", "_"], "postprocess": ([,exp]) => exp},
    {"name": "expression", "symbols": ["sub_expression"], "postprocess": id},
    {"name": "expression", "symbols": ["index_expression"], "postprocess": id},
    {"name": "expression", "symbols": ["comparator_expression"], "postprocess": id},
    {"name": "expression", "symbols": ["or_expression"], "postprocess": id},
    {"name": "expression", "symbols": ["and_expression"], "postprocess": id},
    {"name": "expression", "symbols": ["not_expression"], "postprocess": id},
    {"name": "expression", "symbols": ["paren_expression"], "postprocess": id},
    {"name": "expression", "symbols": ["pipe_expression"], "postprocess": id},
    {"name": "expression", "symbols": ["function_expression"], "postprocess": id},
    {"name": "expression", "symbols": ["multi_select_list"], "postprocess": id},
    {"name": "expression", "symbols": ["multi_select_hash"], "postprocess": id},
    {"name": "expression", "symbols": ["raw_string"]},
    {"name": "expression", "symbols": ["identifier"], "postprocess": id},
    {"name": "expression", "symbols": ["literal"], "postprocess": id},
    {"name": "expression", "symbols": ["current_node"]},
    {"name": "expression", "symbols": ["wildcard"]},
    {"name": "sub_expression$subexpression$1", "symbols": ["identifier"], "postprocess": id},
    {"name": "sub_expression$subexpression$1", "symbols": ["multi_select_list"], "postprocess": id},
    {"name": "sub_expression$subexpression$1", "symbols": ["multi_select_hash"], "postprocess": id},
    {"name": "sub_expression$subexpression$1", "symbols": ["function_expression"], "postprocess": id},
    {"name": "sub_expression$subexpression$1", "symbols": ["wildcard"], "postprocess": id},
    {"name": "sub_expression", "symbols": ["expression", "_", {"literal":"."}, "_", "sub_expression$subexpression$1"], "postprocess": d => ({ type: "sub_exp", exp: d[0], val: d[4] })},
    {"name": "pipe_expression", "symbols": ["expression", "_", {"literal":"|"}, "_", "expression"], "postprocess": d => ({ type: "pipe_exp", lhexp: d[0], rhexp: d[4] })},
    {"name": "or_expression$string$1", "symbols": [{"literal":"|"}, {"literal":"|"}], "postprocess": (d) => d.join('')},
    {"name": "or_expression", "symbols": ["expression", "_", "or_expression$string$1", "_", "expression"], "postprocess": d => ({ type: "or_exp",  lhexp: d[0], rhexp: d[4] })},
    {"name": "and_expression$string$1", "symbols": [{"literal":"&"}, {"literal":"&"}], "postprocess": (d) => d.join('')},
    {"name": "and_expression", "symbols": ["expression", "_", "and_expression$string$1", "_", "expression"], "postprocess": d => ({ type: "and_exp", lhexp: d[0], rhexp: d[4] })},
    {"name": "not_expression", "symbols": [{"literal":"!"}, "_", "expression"], "postprocess": d => ({ type: "not_exp", exp: d[2] })},
    {"name": "paren_expression", "symbols": [{"literal":"("}, "_", "expression", "_", {"literal":")"}], "postprocess": d => ({ type: "paren_exp", exp: d[2] })},
    {"name": "index_expression", "symbols": ["expression", "_", "bracket_specifier"], "postprocess": d => ({ type: "index_exp", exp: d[0], child: d[2] })},
    {"name": "bracket_specifier$subexpression$1", "symbols": ["number"]},
    {"name": "bracket_specifier$subexpression$1", "symbols": ["wildcard"]},
    {"name": "bracket_specifier$subexpression$1", "symbols": ["slice_expression"]},
    {"name": "bracket_specifier", "symbols": [{"literal":"["}, "_", "bracket_specifier$subexpression$1", "_", {"literal":"]"}], "postprocess": d => d[2][0]},
    {"name": "bracket_specifier", "symbols": [{"literal":"["}, "_", {"literal":"]"}], "postprocess": () => null},
    {"name": "bracket_specifier", "symbols": [{"literal":"["}, "_", {"literal":"?"}, "_", "expression", "_", {"literal":"]"}], "postprocess": d => ({ type: "optional_index", exp: d[4] })},
    {"name": "multi_select_list$ebnf$1", "symbols": []},
    {"name": "multi_select_list$ebnf$1$subexpression$1", "symbols": ["_", {"literal":","}, "_", "expression"]},
    {"name": "multi_select_list$ebnf$1", "symbols": ["multi_select_list$ebnf$1", "multi_select_list$ebnf$1$subexpression$1"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "multi_select_list", "symbols": [{"literal":"["}, "_", "expression", "multi_select_list$ebnf$1", "_", {"literal":"]"}], "postprocess":  d => {
          const rest = d[3].map((r: Types.Expression[]) => r[3]);
          return { type: "multi_select_list", elements: [d[2], ...rest] };
        } },
    {"name": "multi_select_hash$ebnf$1", "symbols": []},
    {"name": "multi_select_hash$ebnf$1$subexpression$1", "symbols": ["_", {"literal":","}, "_", "keyval_expr"]},
    {"name": "multi_select_hash$ebnf$1", "symbols": ["multi_select_hash$ebnf$1", "multi_select_hash$ebnf$1$subexpression$1"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "multi_select_hash", "symbols": [{"literal":"{"}, "_", "keyval_expr", "multi_select_hash$ebnf$1", "_", {"literal":"}"}], "postprocess":  d => {
          const rest = d[3].map((r: Types.Expression[]) => r[3]);
          return { type: "multi_select_hash", pairs: [d[2], ...rest] };
        } },
    {"name": "keyval_expr", "symbols": ["identifier", "_", {"literal":":"}, "_", "expression"], "postprocess": d => ({ type: "keyval_exp", key: d[0], val: d[4] })},
    {"name": "slice_expression$ebnf$1", "symbols": ["number"], "postprocess": id},
    {"name": "slice_expression$ebnf$1", "symbols": [], "postprocess": () => null},
    {"name": "slice_expression$ebnf$2", "symbols": ["number"], "postprocess": id},
    {"name": "slice_expression$ebnf$2", "symbols": [], "postprocess": () => null},
    {"name": "slice_expression$ebnf$3$subexpression$1$ebnf$1", "symbols": ["number"], "postprocess": id},
    {"name": "slice_expression$ebnf$3$subexpression$1$ebnf$1", "symbols": [], "postprocess": () => null},
    {"name": "slice_expression$ebnf$3$subexpression$1", "symbols": ["_", {"literal":":"}, "_", "slice_expression$ebnf$3$subexpression$1$ebnf$1"]},
    {"name": "slice_expression$ebnf$3", "symbols": ["slice_expression$ebnf$3$subexpression$1"], "postprocess": id},
    {"name": "slice_expression$ebnf$3", "symbols": [], "postprocess": () => null},
    {"name": "slice_expression", "symbols": ["slice_expression$ebnf$1", "_", {"literal":":"}, "_", "slice_expression$ebnf$2", "slice_expression$ebnf$3"], "postprocess":  d => {
          const start = d[0] === null ? null : d[0];
          const end   = d[4] === null ? null : d[4];
          const step = d[5] ? d[5][2] : null;
          return { type:"slice", start, end, step };
        } },
    {"name": "comparator_expression", "symbols": ["expression", "_", "comparator", "_", "expression"], "postprocess":  d => ({
          type:       "compare_exp",
           comparator: d[2],
          lhexp:      d[0],
          rhexp:      d[4],
        }) },
    {"name": "comparator$string$1", "symbols": [{"literal":"<"}, {"literal":"="}], "postprocess": (d) => d.join('')},
    {"name": "comparator", "symbols": ["comparator$string$1"], "postprocess": id},
    {"name": "comparator", "symbols": [{"literal":"<"}], "postprocess": id},
    {"name": "comparator$string$2", "symbols": [{"literal":"="}, {"literal":"="}], "postprocess": (d) => d.join('')},
    {"name": "comparator", "symbols": ["comparator$string$2"], "postprocess": id},
    {"name": "comparator$string$3", "symbols": [{"literal":">"}, {"literal":"="}], "postprocess": (d) => d.join('')},
    {"name": "comparator", "symbols": ["comparator$string$3"], "postprocess": id},
    {"name": "comparator", "symbols": [{"literal":">"}], "postprocess": id},
    {"name": "comparator$string$4", "symbols": [{"literal":"!"}, {"literal":"="}], "postprocess": (d) => d.join('')},
    {"name": "comparator", "symbols": ["comparator$string$4"], "postprocess": id},
    {"name": "function_expression$subexpression$1", "symbols": ["no_args"]},
    {"name": "function_expression$subexpression$1", "symbols": ["one_or_more_args"]},
    {"name": "function_expression", "symbols": ["function_name", "_", "function_expression$subexpression$1"], "postprocess": d => ({ type: "func_exp", identifier: d[0], args: d[2][0] })},
    {"name": "no_args", "symbols": [{"literal":"("}, "_", {"literal":")"}]},
    {"name": "function_name", "symbols": ["unquoted_string"], "postprocess": id},
    {"name": "one_or_more_args$ebnf$1", "symbols": []},
    {"name": "one_or_more_args$ebnf$1$subexpression$1", "symbols": ["_", {"literal":","}, "_", "function_arg"]},
    {"name": "one_or_more_args$ebnf$1", "symbols": ["one_or_more_args$ebnf$1", "one_or_more_args$ebnf$1$subexpression$1"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "one_or_more_args", "symbols": [{"literal":"("}, "_", "function_arg", "one_or_more_args$ebnf$1", "_", {"literal":")"}], "postprocess":  d => {
          const rest = d[3].map((r: Types.Expression[]) => r[3]);
          return [d[2], ...rest];
        } },
    {"name": "function_arg", "symbols": ["expression"], "postprocess": position((d) => ({ type: "func_arg", exp: d[0] }))},
    {"name": "function_arg", "symbols": ["expression_type"], "postprocess": position((d) => ({ type: "func_arg", exp: d[0] }))},
    {"name": "expression_type", "symbols": [{"literal":"&"}, "_", "expression"], "postprocess": d => ({ type: "expr_type", expr: d[2] })},
    {"name": "current_node", "symbols": [{"literal":"@"}], "postprocess": () => ({ type: "current_node" })},
    {"name": "identifier", "symbols": ["unquoted_string"], "postprocess": id},
    {"name": "identifier", "symbols": ["quoted_string"], "postprocess": id},
    {"name": "wildcard", "symbols": [{"literal":"*"}], "postprocess": position(([value]) => ({ type: "wildcard", value }))},
    {"name": "number", "symbols": ["jsonfloat"], "postprocess": position(([value]) => ({ type: "number", value }))},
    {"name": "raw_string", "symbols": ["sqstring"], "postprocess": position(([value]) => ({ type: "raw_string", value }))},
    {"name": "literal", "symbols": ["btstring"], "postprocess": position(([value]) => ({ type: "literal", value }))},
    {"name": "quoted_string", "symbols": ["dqstring"], "postprocess": position(([value]) => ({ type: "quoted_string", value }))},
    {"name": "letter", "symbols": [/[A-Za-z_]/], "postprocess": id},
    {"name": "letter_or_digit", "symbols": [/[A-Za-z0-9_]/], "postprocess": id},
    {"name": "unquoted_string$ebnf$1", "symbols": []},
    {"name": "unquoted_string$ebnf$1", "symbols": ["unquoted_string$ebnf$1", "letter_or_digit"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "unquoted_string", "symbols": ["letter", "unquoted_string$ebnf$1"], "postprocess": position((d) => ({ type: "unquoted_string", value: d[0] + d[1].join("")}))},
    {"name": "json_value$string$1", "symbols": [{"literal":"f"}, {"literal":"a"}, {"literal":"l"}, {"literal":"s"}, {"literal":"e"}], "postprocess": (d) => d.join('')},
    {"name": "json_value", "symbols": ["json_value$string$1"], "postprocess": () => false},
    {"name": "json_value$string$2", "symbols": [{"literal":"n"}, {"literal":"u"}, {"literal":"l"}, {"literal":"l"}], "postprocess": (d) => d.join('')},
    {"name": "json_value", "symbols": ["json_value$string$2"], "postprocess": () => null},
    {"name": "json_value$string$3", "symbols": [{"literal":"t"}, {"literal":"r"}, {"literal":"u"}, {"literal":"e"}], "postprocess": (d) => d.join('')},
    {"name": "json_value", "symbols": ["json_value$string$3"], "postprocess": () => true},
    {"name": "json_value", "symbols": ["json_object"]},
    {"name": "json_value", "symbols": ["json_array"]},
    {"name": "json_value", "symbols": ["number"]},
    {"name": "json_value", "symbols": ["json_quoted_string"], "postprocess": d => d[0]},
    {"name": "json_quoted_string", "symbols": ["quoted_string"], "postprocess": id},
    {"name": "json_object$ebnf$1$subexpression$1$ebnf$1", "symbols": []},
    {"name": "json_object$ebnf$1$subexpression$1$ebnf$1$subexpression$1", "symbols": ["_", {"literal":","}, "_", "member"]},
    {"name": "json_object$ebnf$1$subexpression$1$ebnf$1", "symbols": ["json_object$ebnf$1$subexpression$1$ebnf$1", "json_object$ebnf$1$subexpression$1$ebnf$1$subexpression$1"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "json_object$ebnf$1$subexpression$1", "symbols": ["member", "json_object$ebnf$1$subexpression$1$ebnf$1"]},
    {"name": "json_object$ebnf$1", "symbols": ["json_object$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "json_object$ebnf$1", "symbols": [], "postprocess": () => null},
    {"name": "json_object", "symbols": [{"literal":"{"}, "_", "json_object$ebnf$1", "_", {"literal":"}"}], "postprocess": 
        d => ({
           type: "json_object",
           val:  d[2] ? [d[2][0], ...d[2][1].map((r: Types.Expression[]) => r[3])] : []
        }) 
        },
    {"name": "member", "symbols": ["quoted_string", "_", {"literal":":"}, "_", "json_value"]},
    {"name": "json_array$ebnf$1$subexpression$1$ebnf$1", "symbols": []},
    {"name": "json_array$ebnf$1$subexpression$1$ebnf$1$subexpression$1", "symbols": ["_", {"literal":","}, "_", "json_value"]},
    {"name": "json_array$ebnf$1$subexpression$1$ebnf$1", "symbols": ["json_array$ebnf$1$subexpression$1$ebnf$1", "json_array$ebnf$1$subexpression$1$ebnf$1$subexpression$1"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "json_array$ebnf$1$subexpression$1", "symbols": ["json_value", "json_array$ebnf$1$subexpression$1$ebnf$1"]},
    {"name": "json_array$ebnf$1", "symbols": ["json_array$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "json_array$ebnf$1", "symbols": [], "postprocess": () => null},
    {"name": "json_array", "symbols": [{"literal":"["}, "_", "json_array$ebnf$1", "_", {"literal":"]"}], "postprocess":  
        d => d[2] ? [d[2][0], ...d[2][1].map((r: Types.Expression[]) => r[3])] : [] 
        }
  ],
  ParserStart: "main",
};

export default grammar;
