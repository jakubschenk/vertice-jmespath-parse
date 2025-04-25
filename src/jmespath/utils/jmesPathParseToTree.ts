import { Grammar, Parser } from "nearley";
import grammar from "../grammar/jmespath";

export function jmesPathParseToTree(input?: string) {
  if (!input) return null;

  try {
    const parser = new Parser(Grammar.fromCompiled(grammar), {
      keepHistory: true,
    });

    parser.feed(input);
    const result = parser.results[0];

    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
}
