
@{%
const position: Types.PositionWrapper = (callback) => {
  return (data: Types.Expression[], pos?: number) => ({
    ...callback(data),
    pos,
  });
};
%}

@preprocessor typescript 

@builtin "number.ne"
@builtin "string.ne"
@builtin "whitespace.ne"

main -> _ expression _ {% ([,exp]) => exp %}

expression ->
    sub_expression			{% id %}
  | index_expression		{% id %}
  | comparator_expression	{% id %}
  | or_expression			{% id %}
  | and_expression			{% id %}	
  | not_expression			{% id %}
  | paren_expression		{% id %}	
  | pipe_expression			{% id %}	
  | function_expression		{% id %}
  | multi_select_list		{% id %}	
  | multi_select_hash		{% id %}	
  | raw_string	
  | identifier				{% id %}			
  | literal					{% id %}	
  | current_node			
  | wildcard  				


sub_expression ->
    expression _ "." _ ( identifier 			{% id %}
                       | multi_select_list		{% id %}
                       | multi_select_hash		{% id %}
                       | function_expression	{% id %}
                       | wildcard				{% id %}
                       )
  {% d => ({ type: "sub_exp", exp: d[0], val: d[4] }) %}


pipe_expression ->
    expression _ "|" _ expression
  {% d => ({ type: "pipe_exp", lhexp: d[0], rhexp: d[4] }) %}

or_expression ->
    expression _ "||" _ expression
  {% d => ({ type: "or_exp",  lhexp: d[0], rhexp: d[4] }) %}


and_expression ->
    expression _ "&&" _ expression
  {% d => ({ type: "and_exp", lhexp: d[0], rhexp: d[4] }) %}


not_expression ->
    "!" _ expression
  {% d => ({ type: "not_exp", exp: d[2] }) %}


paren_expression ->
    "(" _ expression _ ")"
  {% d => ({ type: "paren_exp", exp: d[2] }) %}

index_expression ->
    expression _ bracket_specifier
  {% d => ({ type: "index_exp", exp: d[0], child: d[2] }) %}

bracket_specifier ->
    "[" _ ( number | wildcard | slice_expression ) _ "]"   {% d => d[2][0] %}
  | "[" _ "]"                                              {% () => null %}
  | "[" _ "?" _ expression _ "]"                           {% d => ({ type: "optional_index", exp: d[4] }) %}


multi_select_list ->
    "[" _ expression (_ "," _ expression):* _ "]"
  {% d => {
       const rest = d[3].map((r: Types.Expression[]) => r[3]);
       return { type: "multi_select_list", elements: [d[2], ...rest] };
     } %}


multi_select_hash ->
    "{" _ keyval_expr (_ "," _ keyval_expr):* _ "}"
  {% d => {
       const rest = d[3].map((r: Types.Expression[]) => r[3]);
       return { type: "multi_select_hash", pairs: [d[2], ...rest] };
     } %}

keyval_expr ->
    identifier _ ":" _ expression
  {% d => ({ type: "keyval_exp", key: d[0], val: d[4] }) %}


slice_expression ->
    number:? _ ":" _ number:? (_ ":" _ number:?):?
  {% d => {
       const start = d[0] === null ? null : d[0];
       const end   = d[4] === null ? null : d[4];
       const step = d[5] ? d[5][2] : null;
       return { type:"slice", start, end, step };
     } %}


comparator_expression ->
    expression _ comparator _ expression
  {% d => ({
       type:       "compare_exp",
        comparator: d[2],
       lhexp:      d[0],
       rhexp:      d[4],
     }) %}

comparator -> "<="	{% id %}
			 | "<"	{% id %}
			 | "=="	{% id %}
			 | ">="	{% id %}
			 | ">"	{% id %}
			 | "!=" {% id %}


function_expression ->
    function_name _ ( no_args | one_or_more_args )
    {% d => ({ type: "func_exp", identifier: d[0], args: d[2][0] }) %}

no_args -> "(" _ ")" 

function_name ->
    unquoted_string {% id %}

one_or_more_args ->
    "(" _ function_arg (_ "," _ function_arg):* _ ")"
  {% d => {
       const rest = d[3].map((r: Types.Expression[]) => r[3]);
       return [d[2], ...rest];
     } %}

function_arg ->
    expression     {% position((d) => ({ type: "func_arg", exp: d[0] })) %}
  | expression_type {% position((d) => ({ type: "func_arg", exp: d[0] })) %}

expression_type ->
    "&" _ expression
  {% d => ({ type: "expr_type", expr: d[2] }) %}

current_node -> "@" {% () => ({ type: "current_node" }) %}

identifier ->
    unquoted_string		{% id %}
  | quoted_string      	{% id %}	

wildcard      -> "*"                {% position(([value]) => ({ type: "wildcard", value })) %}
number 		  -> jsonfloat          {% position(([value]) => ({ type: "number", value })) %}
raw_string    -> sqstring      		{% position(([value]) => ({ type: "raw_string", value })) %}
literal       -> btstring     		{% position(([value]) => ({ type: "literal", value })) %}
quoted_string -> dqstring			{% position(([value]) => ({ type: "quoted_string", value })) %}
letter        -> [A-Za-z_]          {% id %}
letter_or_digit -> [A-Za-z0-9_]     {% id %}
unquoted_string ->
    letter letter_or_digit:*  		{% position((d) => ({ type: "unquoted_string", value: d[0] + d[1].join("")})) %}

json_value ->
    "false"             {% () => false %}
  | "null"              {% () => null %}
  | "true"              {% () => true %}
  | json_object
  | json_array
  | number
  | json_quoted_string  {% d => d[0] %}

json_quoted_string -> quoted_string {% id %}

json_object -> "{" _ ( member (_ "," _ member):* ):? _ "}" 
{%
    d => ({
       type: "json_object",
       val:  d[2] ? [d[2][0], ...d[2][1].map((r: Types.Expression[]) => r[3])] : []
    }) 
%}

member -> quoted_string _ ":" _ json_value

json_array -> "[" _ ( json_value (_ "," _ json_value):* ):? _ "]"
{% 
    d => d[2] ? [d[2][0], ...d[2][1].map((r: Types.Expression[]) => r[3])] : [] 
%}


